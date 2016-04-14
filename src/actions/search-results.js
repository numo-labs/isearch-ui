import { QUERY_FETCH_SEARCH_RESULT } from '../constants/queries';
import { MUTATION_START_SEARCH } from '../constants/mutations';
import {
  RECEIVE_SEARCH_RESULT,
  BUSY_SEARCHING,
  SET_SEARCH_STRING,
  SAVE_SEARCH_RESULT_ID,
  UPDATE_DISPLAYED_ITEMS
} from '../constants/actionTypes';
import * as graphqlService from '../services/graphql';
// import { addTags } from './tags.js';
// import { addTiles } from './tiles.js';
import { addSingleTag } from './tiles.js';
import _ from 'lodash';

export function fetchQuerySearchResults (id, page, size, initialSearch) {
  const fetchQuerySearchResults_anonymousFn = function (dispatch, getState) {
    return graphqlService.query(QUERY_FETCH_SEARCH_RESULT, {'id': id, 'page': page, 'size': size})
    .then(json => {
      console.log('json', json);
      const items = json.data.viewer.searchResult.items;
      if (!items || !items.length) {
        setTimeout(function () {
          console.log('Retrying');
          dispatch(fetchQuerySearchResults(id, page, size));
        }, 1000);
      } else {
        // dispatch(addTags());
        // dispatch(addTiles());
        dispatch(receiveSearchResult(items, initialSearch));
      }
    });
  };
  return fetchQuerySearchResults_anonymousFn;
}

/*
* Receives the items and adds them to the items store as well as merging them
* with the currently displayedItems
*/
export function receiveSearchResult (items, initialSearch) {
  return {
    type: RECEIVE_SEARCH_RESULT,
    items,
    loading: false,
    initialSearch
  };
}

export function setSearchString (searchString) {
  return {
    type: SET_SEARCH_STRING,
    searchString
  };
}

export function busySearching () {
  return {
    type: BUSY_SEARCHING,
    loading: true
  };
}

export function saveSearchResultId (id) {
  return {
    type: SAVE_SEARCH_RESULT_ID,
    id: id
  };
}

export function updateDisplayedItems (results) {
  return {
    type: UPDATE_DISPLAYED_ITEMS,
    items: results
  };
}

export function filterResults () {
  return (dispatch, getState) => {
    const { search: { tags, items } } = getState();
    const geoTags = tags.filter(tag => tag.includes('geo'));
    const amenityTags = tags.filter(tag => !tag.inclues('amenity'));
    if (items.length > 0) {
      const results = items.filter(item => {
        return (
          geoTags.some(tag => item.hotel.place.country === tag.displayName) && // e.g. either spain or greece
          amenityTags.every(tag => item.amenities[tag.displayName]) // and with wifi and kids friendly
        );
      });
      dispatch(updateDisplayedItems(results));
    }
    dispatch(startSearch());
  };
}

export function startSearch () {
  const fetchQuerySearchResults_anonymousFn = function (dispatch, getState) {
    const { search: { searchString, tags } } = getState();
    const tagExists = _.filter(tags, _.matchesProperty('tagName', searchString)).length > 0;
    if (tagExists) {
      return; // don't redo the search if the tag is already present. 
    } else {
      const initialSearch = tags.length === 0; // if not tags then it means this is the first search
      if (initialSearch) { dispatch(busySearching()); } // this will show a loading spinner on the very first search
      dispatch(addSingleTag(searchString, 'geo')); // add the search string as a new tag;
      const geoTags = tags.filter(tag => tag.id.indexOf('geo') > -1).map(tag => tag.tagName);
      const amenityTags = tags.filter(tag => tag.id.indexOf('amenity') > -1).map(tag => tag.id);
      const query = {
        geography: geoTags.concat(searchString),
        amenity: amenityTags,
        passengers: [
          {birthday: '1986-07-14'}
        ]
      };
      console.log('query', query, tags);
      return graphqlService.query(MUTATION_START_SEARCH, {'query': JSON.stringify(query)})
      .then(json => {
        const searchResultId = json.data.viewer.searchResultId.id;
        console.log('searchbucketid', searchResultId);
        dispatch(saveSearchResultId(searchResultId));
        dispatch(fetchQuerySearchResults(searchResultId, 1, 20, initialSearch));
      });
    }
  };
  return fetchQuerySearchResults_anonymousFn;
}

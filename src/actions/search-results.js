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
import { addTags } from './tags.js';
import { addTiles } from './tiles.js';
import { addSingleTag } from './tiles.js';

export function fetchQuerySearchResults (id, page, size) {
  const fetchQuerySearchResults_anonymousFn = function (dispatch, getState) {
    return graphqlService.query(QUERY_FETCH_SEARCH_RESULT, {'id': id, 'page': page, 'size': size})
    .then(json => {
      const items = json.data.viewer.searchResult.items;
      if (!items || !items.length) {
        setTimeout(function () {
          console.log('Retrying');
          dispatch(fetchQuerySearchResults(id, page, size));
        }, 1000);
      } else {
        dispatch(addTags());
        dispatch(addTiles());
        dispatch(receiveSearchResult(items));
      }
    });
  };
  return fetchQuerySearchResults_anonymousFn;
}

/*
* Receives the items and adds them to the items store as well as merging them
* with the currently displayedItems
*/
export function receiveSearchResult (items) {
  return {
    type: RECEIVE_SEARCH_RESULT,
    items,
    loading: false
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
    if (tags.length === 0) { dispatch(busySearching()); } // this will show a loading spinner on the very first search
    dispatch(addSingleTag(searchString, 'geo')); // add the search string as a new tag;
    const geoTags = tags.filter(tag => tag.includes('geo'));
    const amenityTags = tags.filter(tag => !tag.inclues('amenity'));
    const query = {
      geography: geoTags.push(searchString),
      amenity: amenityTags,
      passengers: [
        {birthday: '1986-07-14'}
      ]
    };
    return graphqlService.query(MUTATION_START_SEARCH, {'query': JSON.stringify(query)})
    .then(json => {
      const searchResultId = json.data.viewer.searchResultId.id;
      dispatch(saveSearchResultId(searchResultId));
      dispatch(fetchQuerySearchResults(searchResultId, 1, 20));
    });
  };
  return fetchQuerySearchResults_anonymousFn;
}

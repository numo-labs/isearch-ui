'use strict';

// constants
import { QUERY_FETCH_SEARCH_RESULT } from '../constants/queries';
import { MUTATION_START_SEARCH } from '../constants/mutations';
import {
  RECEIVE_SEARCH_RESULT,
  BUSY_SEARCHING,
  SET_SEARCH_STRING,
  SAVE_SEARCH_RESULT_ID,
  UPDATE_DISPLAYED_ITEMS,
  SEARCH_ERROR
} from '../constants/actionTypes';

// actions
import * as graphqlService from '../services/graphql';
import { addTiles } from './tags.js';
import { formatQuery } from './helpers.js';

/**
* Gets the id of the searchBucket and initiates a graphql query to retrieve
* the search results
* @param {String} - id - searchbucketid
* @param {Number} - page - page to start from
* @param {Number} - size - number of results to retrieve
* @param {Number} - attempt - the number of times the function has been called
*
* Polls graphql 10 times before returning an error
*/

export function fetchQuerySearchResults (id, page, size, attempt) {
  return (dispatch, getState) => {
    const { search: { displayedItems } } = getState();
    const initialSearch = displayedItems.length === 0;
    return graphqlService
      .query(QUERY_FETCH_SEARCH_RESULT, {'id': id, 'page': page, 'size': size})
      .then(json => {
        const items = json.data.viewer.searchResult.items;
        if (attempt > 9) {
          return dispatch(searchError('Something went wrong and no results were found'));  // stop polling after 10 attempts
        } else if ((!items || !items.length) && attempt < 10) {
          setTimeout(function () {
            console.log('Retrying', attempt);
            dispatch(fetchQuerySearchResults(id, page, size, ++attempt));
          }, 1000);
        } else {
          if (initialSearch) {
            dispatch(addTiles()); // add filters if it is the initial search
          }
          dispatch(receiveSearchResult(items, initialSearch));
        }
      });
  };
}

/*
* saves the error to the store to display an error message
*/

export function searchError (error) {
  return {
    type: SEARCH_ERROR,
    error
  };
}

/*
* Receives the items and adds them to the items store as well as merging them
* with the currently displayedItems
*/
export function receiveSearchResult (items, initialSearch) {
  return {
    type: RECEIVE_SEARCH_RESULT,
    items,
    initialSearch
  };
}

/*
* Saves the input search string to state
*/

export function setSearchString (searchString) {
  return {
    type: SET_SEARCH_STRING,
    searchString
  };
}

/*
* Sets the loading state to true to show a loading spinner
*/

export function busySearching () {
  return {
    type: BUSY_SEARCHING
  };
}

/*
* Saves the searchBucketId if in future we need to retrieve more
* results on scroll
*/

export function saveSearchResultId (id) {
  return {
    type: SAVE_SEARCH_RESULT_ID,
    id: id
  };
}

/*
* Updates the displayedItems state with the filtered results
*/

export function updateDisplayedItems (results) {
  return {
    type: UPDATE_DISPLAYED_ITEMS,
    items: results
  };
}

/**
* Action that is called when the 'yes' button on a filter is clicked
* 1. get all the geo and amenity tags
* 2. if search results already exist, filter the existing results and update
* the displayedItems
* 3. launch a new search to get more items
*/

export function filterResults () {
  return (dispatch, getState) => {
    const { search: { tags, items } } = getState();
    const geoTags = tags.filter(tag => tag.id.indexOf('geo') > -1);
    const amenityTags = tags.filter(tag => tag.id.indexOf('amenity') > -1);
    if (items.length > 0) {
      const results = items.filter(item => {
        return (
          // geoTags.some(tag => item.packageOffer.hotel.place.country === tag.displayName) && // e.g. either spain or greece
          amenityTags.every(tag => item.packageOffer.amenities[tag.id.split(':')[1]]) // and with wifi and kids friendly
        );
      });
      dispatch(updateDisplayedItems(results));
    }
    if (geoTags.length > 0) {
      dispatch(startSearch());
    }
  };
}

/**
* Action to start the search
* 1. check if the searchString is already a tag. If so then return without
*    dispatching an action
* 2. check if this is the first search - if it is, then call the busySearching
*    action to show the loading spinner
* 4. format the query based on the tags
* 5. launch a graphql mutation to return a searchBucketId
*/

export function startSearch () {
  return (dispatch, getState) => {
    const { search: { searchString, tags, displayedItems } } = getState();
    const tagExists = tags.filter(tag => tags.displayName === searchString).length > 0;
    if (tagExists) {
      return;
    } else {
      if (displayedItems.length === 0) {
        dispatch(busySearching());
      }
      const query = formatQuery(tags);
      console.log('query', query);
      return graphqlService
        .query(MUTATION_START_SEARCH, {'query': JSON.stringify(query)})
        .then(json => {
          const searchResultId = json.data.viewer.searchResultId.id;
          dispatch(saveSearchResultId(searchResultId));
          dispatch(fetchQuerySearchResults(searchResultId, 1, 20, 0));
        });
    }
  };
}

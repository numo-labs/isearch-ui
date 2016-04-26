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
  SEARCH_ERROR,
  VIEW_SEARCH
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
* @param {Number} - attempt - the number of times the function has been called (starts at 1)
*
* Polls graphql 10 times before returning an error
*/

export function fetchQuerySearchResults (id, page, size, attempt) {
  const fetchQuerySearchResults_anonymousFn = (dispatch, getState) => {
    const { search: { displayedItems } } = getState();
    const initialSearch = displayedItems.length === 0;
    return graphqlService
      .query(QUERY_FETCH_SEARCH_RESULT, {'id': id, 'page': page, 'size': size})
      .then(json => {
        // console.log('json', json);
        const items = json.data.viewer.searchResult.items;
        if (attempt > 15) {
          return dispatch(searchError('Something went wrong and no results were found'));  // stop polling after 10 attempts
        } else if ((!items || !items.length || !packageOffersReturned(items))) {
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
  return fetchQuerySearchResults_anonymousFn; // needed for testing polling
}

function packageOffersReturned (items) {
  return items.some(function (item) {
    if (item.type === 'packageOffer') return true;
  });
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
* Action to start the search
* 1. format the query based on the tags
* 2. launch a graphql mutation to return a searchBucketId
*/

export function startSearch () {
  return (dispatch, getState) => {
    const { search: { tags } } = getState();
    if (tags.length > 0) {
      dispatch(busySearching());
      const query = formatQuery(tags);
      return graphqlService
        .query(MUTATION_START_SEARCH, {'query': JSON.stringify(query)})
        .then(json => {
          const searchResultId = json.data.viewer.searchResultId.id;
          dispatch(saveSearchResultId(searchResultId));
          dispatch(fetchQuerySearchResults(searchResultId, 1, 100, 1));
        });
    }
  };
}

export const backToSearch = () => { return {type: VIEW_SEARCH}; };

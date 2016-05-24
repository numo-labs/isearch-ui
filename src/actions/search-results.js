'use strict';

// constants
import { MUTATION_START_SEARCH } from '../constants/mutations';
import {
  RECEIVE_SEARCH_RESULT,
  BUSY_SEARCHING,
  SET_SEARCH_STRING,
  SAVE_SEARCH_RESULT_ID,
  SEARCH_ERROR,
  UPDATE_HEADER_TITLES,
  SAVE_SOCKET_CONNECTION_ID,
  SAVE_BUCKET_ID,
  CLEAR_FEED
} from '../constants/actionTypes';

import * as graphqlService from '../services/graphql';
import { formatQuery } from './helpers.js';
// routing actionCreator
import { push } from 'react-router-redux';

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
export function receiveSearchResult (items, initialSearch, append) {
  return {
    type: RECEIVE_SEARCH_RESULT,
    items,
    initialSearch,
    append: append || false
  };
}

/*
* Saves the searchResultId to update links to articles in the UI
*/

export function saveSearchResultId (id) {
  return {
    type: SAVE_SEARCH_RESULT_ID,
    id: id
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

export function busySearching (isBusy) {
  return {
    type: BUSY_SEARCHING,
    isBusy
  };
}

/*
* Saves the searchBucketId if in future we need to retrieve more
* results on scroll
*/

export function saveBucketId (id) {
  return {
    type: SAVE_BUCKET_ID,
    id: id
  };
}

/*
* Saves the socket connection id to send in the graphql mutation query
*/

export function saveSocketConnectionId (id) {
  return {
    type: SAVE_SOCKET_CONNECTION_ID,
    id
  };
}

/**
* Clear all the items in the feed
*/

export function clearFeed () {
  return { type: CLEAR_FEED };
}

/**
* Action to start the search
* 1. format the query based on the tags
* 2. launch a graphql mutation to return a searchBucketId
*/

export function startSearch () {
  return (dispatch, getState) => {
    const store = getState();
    const { search: { tags, fingerprint: clientId, socketConnectionId: connectionId } } = store;
    if (tags.length > 0) {
      dispatch(busySearching(true));
      const query = formatQuery(store);
      console.log('query', JSON.stringify(query));
      return graphqlService
        .query(MUTATION_START_SEARCH, {'query': JSON.stringify(query), clientId, connectionId})
        .then(json => {
          console.log('search response json', json);
          const bucketId = json.data.viewer.searchResultId.id;
          if (bucketId) {
            dispatch(saveSearchResultId(bucketId));
            dispatch(push(`/search/${bucketId}`));
            // dispatch(clearFeed());
          } else {
            return dispatch(searchError('No results found'));
          }
        });
    }
  };
}

/*
* Saves the results returned from the web socket service
*/

export function saveSearchResult (result) {
  return (dispatch, getState) => {
    const { search: { resultId } } = getState();
    if (result.graphql.searchId === resultId) { // check data corresponds to the current search
      return dispatch(receiveSearchResult(result.graphql.items, false, false));
    }
  };
}

/*
* Updates the titles shown in the search page header
*/

export function updateHeaderTitles () {
  return (dispatch, getState) => {
    const {
      search: {
        numberOfAdults,
        numberOfChildren,
        duration
      }
    } = getState();
    dispatch(updateTitles(numberOfAdults, numberOfChildren, duration));
  };
}

export function updateTitles (numberOfAdults, numberOfChildren, duration) {
  return {
    type: UPDATE_HEADER_TITLES,
    numberOfAdults,
    numberOfChildren,
    duration
  };
}

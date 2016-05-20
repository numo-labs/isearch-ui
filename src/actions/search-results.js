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
  SAVE_SOCKET_CONNECTION_ID
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

export function saveSearchResultId (id) {
  return {
    type: SAVE_SEARCH_RESULT_ID,
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
          const searchResultId = json.data.viewer.searchResultId.id;
          if (searchResultId) {
            dispatch(saveSearchResultId(searchResultId));
            dispatch(push(`/search/${searchResultId}`));
            // no longer need to poll for results!
            // dispatch(fetchQuerySearchResults(searchResultId, 0, 1000, 1));
          } else {
            return;
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
    const { search: { bucketId } } = getState();
    if (result.graphql.searchId === bucketId) { // check data corresponds to the current search
      return dispatch(receiveSearchResult(result.graphql.items, false, true));
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

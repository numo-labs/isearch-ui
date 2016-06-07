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
  CLEAR_FEED,
  UPDATE_DISPLAYED_ITEMS
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
* Buffer and show tiles in a mixed fashion
* to be used by saveSearchResult
*/

export function mixDataInput () {
  // this fn is used to setup a result store, so that we are instance specific.
  let mixture = [];
  let bufferedResponse = [];
  let steps = 1;
  let highwatermark = 10;

  return function (result) {
    return function (dispatch) {
      const items = result.graphql.items;

      items.forEach(item => {
        if (item.tile) {
          mixture.push(item);
        } else if (item.packageOffer) {
          if (steps % 6 === 0) {
            bufferedResponse.push(undefined);
          }
          bufferedResponse.push(item);
        } else {
          mixture.push(item);
        }
      });

      // return first 5 tiles as fast as possible
      if (steps < 5 && bufferedResponse.length > 0) {
        steps = steps + bufferedResponse.length;
        return dispatch(receiveSearchResult(bufferedResponse.splice(0, bufferedResponse.length), false, false));
      }

      steps++;

      if (bufferedResponse.length >= highwatermark) {
        const response = bufferedResponse
          .map(item => item === undefined ? mixture.shift() : item)
          .filter(item => item !== undefined);
        bufferedResponse = [];
        return dispatch(receiveSearchResult(response, false, false));
      }
    };
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
          console.log('search response json', json);
          dispatch(clearFeed());
          const bucketId = json.data.viewer.searchResultId.id;
          if (bucketId) {
            dispatch(saveSearchResultId(bucketId));
            dispatch(push(`/search/${bucketId}`));
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

var mixer = mixDataInput();

export function saveSearchResult (result) {
  return (dispatch, getState) => {
    const { search: { resultId } } = getState();
    if (result.graphql.searchId === resultId) { // check data corresponds to the current search
      return dispatch(mixer(result));
    }
  };
}

export function updateHeaderTitles () {
  return { type: UPDATE_HEADER_TITLES };
}

export function updateDisplayedItems (items) {
  return { type: UPDATE_DISPLAYED_ITEMS, items };
}

export function loadMoreItemsIntoFeed (page) {
  return (dispatch, getState) => {
    const { search: { displayedItems, items } } = getState();
    if (displayedItems.length < 10 && items.length > 0) {
      dispatch(updateDisplayedItems(items.slice(0, 10)));
    } else if (items.length >= page * 5) {
      dispatch(updateDisplayedItems(items.slice(0, page * 5)));
    } else if (displayedItems.length === 0 && items.length === 0) {
      return; // no unecessary re-render if no items returned
    }
  };
}

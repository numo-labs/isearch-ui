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
  UPDATE_DISPLAYED_ITEMS,
  RECEIVE_RELATED_RESULT,
  SEARCH_COMPLETE,
  UPDATE_TILE_RANKING
} from '../constants/actionTypes';

import * as graphqlService from '../services/graphql';
import { formatQuery } from './helpers.js';
// routing actionCreator
import timers from 'timers';
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
* Adds items to the relatedItems store to be shown when there are no more packages
*/

export function receiveRelatedResult (items) {
  const relatedItems = items.map(item => { return { ...item, related: true }; });
  return { type: RECEIVE_RELATED_RESULT, items: relatedItems };
}

export function setSearchComplete (result = 'timeout') {
  return (dispatch, getState) => {
    const { search: { resultId, displayedItems, secondaryPageSize } } = getState();
    if (result === 'timeout' || result.graphql.searchId === resultId) { // check result corresponds to the current search
      // if there are still no items rendered then flush any buffered results to the page
      if (displayedItems.length < secondaryPageSize) {
        dispatch(loadMoreItemsIntoFeed());
      }
      return dispatch({ type: SEARCH_COMPLETE });
    }
  };
}

/*
* Saves the searchResultId to update links to articles in the UI
*/

export function saveSearchResultId (id) {
  window.searchResultId = id;
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
let timer;
export function startSearch (a) {
  return (dispatch, getState) => {
    const store = getState();
    const { search: { tags, fingerprint: clientId, socketConnectionId: connectionId } } = store;
    if (tags.length > 0) {
      dispatch(busySearching(true));
      if (timer) clearTimeout(timer);
      timer = timers.setTimeout(() => dispatch(setSearchComplete()), 3000); // wait 4 seconds and then set search as complete so at least related results are shown
      const query = formatQuery(store);
      console.log('query', JSON.stringify(query));
      return graphqlService
        .query(MUTATION_START_SEARCH, {'query': JSON.stringify(query), clientId, connectionId})
        .then(json => {
          dispatch(clearFeed());
          console.log('search response json', json.data.viewer.startSearch);
          const bucketId = json.data.viewer.startSearch.id;
          if (bucketId) {
            dispatch(saveSearchResultId(bucketId));
          } else {
            dispatch(saveSearchResultId(null));
            return dispatch(searchError('No results found'));
          }
        });
    }
  };
}

export function saveSearchResult (result) {
  return (dispatch, getState) => {
    const { search: { resultId } } = getState();
    const searchId = result.graphql.searchId;
    if (resultId && searchId.indexOf(resultId) > -1) { // check data corresponds to the current search
      if (searchId.indexOf('related') > -1) { // if result is from a search for related content, save it separately
        return dispatch(receiveRelatedResult(result.graphql.items));
      } else {
        dispatch(receiveSearchResult(result.graphql.items, false, true));
        dispatch(loadInitialData());
      }
    }
  };
}

let renderTimer;
export function loadInitialData () {
  return (dispatch, getState) => {
    const { search: { displayedItems, items, initialPageSize, secondaryPageSize } } = getState();
    // if there is enough data to render the first page of results, do so immediately and clear any timers
    if (displayedItems.length < initialPageSize && items.length >= initialPageSize) {
      dispatch(loadMoreItemsIntoFeed());
    } else if (displayedItems.length < secondaryPageSize) {
      // otherwise if no results are received for 1s then push what we have
      if (renderTimer) timers.clearTimeout(renderTimer);
      renderTimer = timers.setTimeout(() => {
        dispatch(loadMoreItemsIntoFeed());
      }, 1000);
    }
  };
}

export function updateHeaderTitles () {
  return { type: UPDATE_HEADER_TITLES };
}

export function updateDisplayedItems (items) {
  return { type: UPDATE_DISPLAYED_ITEMS, items };
}

export function updateTileRanking (result) {
  return (dispatch, getState) => {
    const { search: { resultId } } = getState();
    const searchId = result.graphql.searchId;
    if (resultId && searchId === resultId) { // check data corresponds to the current search
      dispatch({ type: UPDATE_TILE_RANKING, ranking: result.graphql.ranking });
    }
  };
}

function sortFeed (items, ranking, start) {
  if (ranking) {
    const rest = items.slice(start).sort((a, b) => {
      return b.rank - a.rank;
    });
    items.splice(start, rest.length, ...rest);
  }
}

export function loadMoreItemsIntoFeed () {
  return (dispatch, getState) => {
    const { search: { displayedItems, items, relatedItems, ranking, pageSize, secondaryPageSize } } = getState();
    if (displayedItems.length === 0 && items.length === 0) {
      return; // no unecessary re-render if no items returned
    } else if (items.length > displayedItems.length) {
      sortFeed(items, ranking, displayedItems.length);
      const end = Math.max(secondaryPageSize, displayedItems.length + pageSize);
      return dispatch(updateDisplayedItems(items.slice(0, end)));
    } else if (displayedItems.length >= items.length) {  // if items store has been exhausted retrieve from relatedContent store
      const start = displayedItems.length - items.length;
      const relatedContent = relatedItems.slice(0, start + pageSize);
      return dispatch(updateDisplayedItems(items.concat(relatedContent)));
    }
  };
}

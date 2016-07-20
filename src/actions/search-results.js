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
  SEARCH_COMPLETE
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
    const { search: { resultId } } = getState();
    if (result === 'timeout' || result.graphql.searchId === resultId) { // check result corresponds to the current search
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

function isTile (item) {
  return !item.packageOffer;
}

function isFilter (item) {
  return item.type === 'filter';
}

/**
* Buffer and show tiles in a mixed fashion
* to be used by saveSearchResult
*/

export function mixDataInput () {
  // this fn is used to setup a result store, so that we are instance specific.
  let tiles = [];
  let packages = [];

  let mixture = [];

  let steps = 1;
  let highwatermark = 20;

  let timeout = null;

  function shake () {
    const total = tiles.length + packages.length;

    // weave tiles and packages to mixture
    for (let i = 1; i < total + 1; i++) {
      if (packages.length > 0) {
        if (i % 6 && tiles.length) {
          mixture.push(tiles.pop());
        }
        mixture.push(packages.pop());
      } else if (tiles.length > 0) {
        mixture.push(tiles.pop());
      }
    }
  }

  function stir (amount) {
    // Special case for filters, if they arrive all at once we do not want them
    // next to each other, so we will take them out of the mixture, put them back
    // on the tiles array so that they are reshuffled next time.
    if (mixture.every(item => isFilter(item))) {
      tiles = mixture.filter(item => isFilter(item));
      mixture = [];
      return false;
    }

    // Take all packages out of the mixture
    packages = mixture.filter(item => !isTile(item));
    // take all tiles out of the mixture
    tiles = mixture.filter(item => isTile(item));

    // mix them up again, if we have packages it is interleaved with tiles.
    shake();

    // Return the amount asked for
    let items = mixture.splice(0, amount);
    mixture = mixture.filter(item => item); // remove anything falsy

    return items;
  }

  return function (result) {
    return function (dispatch) {
      const items = result.graphql.items;

      // We clear and set a new timeout to ensure that we are always waiting
      // for 700ms since the last message. If this time expires we flush out
      // everything to the client.
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        mixture = mixture.concat(tiles);
        tiles = [];
        let amount = mixture.length;
        let res = stir(amount);
        if (!res) return;
        return dispatch(receiveSearchResult(res, false, false));
      }, 700);

      items.forEach(item => {
        if (isTile(item)) {
          tiles.push(item);
        } else {
          packages.push(item);
        }
      });

      shake();

      // Dispatch 5 items to the front-end at the same
      if (steps < 5 && mixture.length >= 5) {
        let amount = 5;
        steps = steps + amount;
        let res = stir(amount);
        if (res) dispatch(receiveSearchResult(res, false, false));
      }

      steps++;

      // return at least the highwatermark to ensure a nice mixture of tiles.
      if (mixture.length >= highwatermark) {
        let amount = mixture.length;
        let res = stir(amount);
        if (!res) return;
        return dispatch(receiveSearchResult(res, false, false));
      }
    };
  };
}

/*
* Saves the results returned from the web socket service
*/

var mixer = mixDataInput();

/**
* Action to start the search
* 1. format the query based on the tags
* 2. launch a graphql mutation to return a searchBucketId
*/
let timer;
export function startSearch (a) {
  return (dispatch, getState) => {
    mixer = mixDataInput();
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
          console.log('search response json', json.data.viewer.searchResultId);
          dispatch(clearFeed());
          const bucketId = json.data.viewer.searchResultId.id;
          if (bucketId) {
            dispatch(saveSearchResultId(bucketId));
          } else {
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
    if (searchId.indexOf(resultId) > -1) { // check data corresponds to the current search
      if (searchId.indexOf('related') > -1) { // if result is from a search for related content, save it separately
        return dispatch(receiveRelatedResult(result.graphql.items));
      } else {
        return dispatch(mixer(result));
      }
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
    const { search: { displayedItems, items, relatedItems } } = getState();
    if (displayedItems.length === 0 && items.length === 0) {
      return; // no unecessary re-render if no items returned
    } else if (items.length >= page * 5) {
      return dispatch(updateDisplayedItems(items.slice(0, page * 5))); // if 5 x page number exists send back 5 x
    } else if (items.length > displayedItems.length) {
      return dispatch(updateDisplayedItems(items)); // if 5 x page number doesn't exist send all available items
    } else if (displayedItems.length === items.length) {  // if items store has been exhausted retrieve from relatedContent store
      const newPage = page - Math.floor(items.length / 5);
      const relatedContent = relatedItems.slice(0, newPage * 5);
      return dispatch(updateDisplayedItems(items.concat(relatedContent)));
    }
  };
}

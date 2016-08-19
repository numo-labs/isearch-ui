'use strict';

import {
  RECEIVE_SEARCH_RESULT,
  BUSY_SEARCHING,
  TAG_REMOVE_TAG,
  TAG_ADD_SINGLE_TAG,
  RESET_TAGS,
  TILES_REMOVE_TILE,
  SET_SEARCH_STRING,
  SEARCH_ERROR,
  SET_AUTOCOMPLETE_ERROR,
  SET_AUTOCOMPLETE_OPTIONS,
  SET_AUTOCOMPLETE_IN_SEARCH,
  CLEAR_SEARCH_STRING,
  SAVE_SEARCH_RESULT_ID,
  SAVE_SOCKET_CONNECTION_ID,
  SET_FINGERPRINT,
  SAVE_BUCKET_ID,
  CLEAR_FEED,
  UPDATE_DISPLAYED_ITEMS,
  RECEIVE_RELATED_RESULT,
  UPDATE_TILE_RANKING,
  REGISTER_PROVIDER
} from '../constants/actionTypes';

import DEFAULT_TAG from '../constants/default-tag.js';

import union from 'lodash.union';
import uniqBy from 'lodash.uniqby';
import every from 'lodash.every';

export const initialState = {
  defaultTag: DEFAULT_TAG,
  fingerprint: '',
  socketConnectionId: '',
  bucketId: '',
  resultId: '',
  displayedItems: [],
  items: [],
  relatedItems: [],
  loading: false,
  isInitialTag: false,
  tags: [],
  searchString: '',
  error: '',
  autocompleteError: '',
  autocompleteOptions: [],
  inAutoCompleteSearch: false, // use to show loading spinner
  departureAirport: '',
  departureDate: '',
  passengerBirthdays: [],
  initialPageSize: 2, // the number of search results to show *immediately*
  secondaryPageSize: 20, // show this many results after 3 seconds or when there is a gap in incoming results
  pageSize: 5,
  searchComplete: false, // set to false until a message is received from the web socket channel
  feedEnd: false,
  ranking: {},
  providers: {}
};

export default function search (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SEARCH_RESULT:
      const itemsToDisplay = uniqBy(union(state.items, action.items), (a) => {
        return a.id;
      });
      itemsToDisplay.forEach((item) => {
        if (state.ranking) {
          let id = item.id;
          if (item.type === 'package') {
            id = `hotel:ne.wvid.${item.id}`;
          }
          item.rank = parseFloat(state.ranking[id]) || 0;
        }
      });
      return {
        ...state,
        items: itemsToDisplay,
        loading: false,
        error: ''
      };
    case RECEIVE_RELATED_RESULT:
      return {
        ...state,
        relatedItems: state.relatedItems.concat(action.items)
      };
    case UPDATE_DISPLAYED_ITEMS:
      return {
        ...state,
        displayedItems: action.items,
        feedEnd: action.items.length >= state.items.length
      };
    case BUSY_SEARCHING:
      return {
        ...state,
        loading: action.isBusy,
        searchComplete: false
      };
    case SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case UPDATE_TILE_RANKING:
      state.items.forEach(item => {
        let id = item.id;
        if (item.type === 'package') {
          id = `hotel:ne.wvid.${item.id}`;
        }
        item.rank = parseFloat(action.ranking[id]) || 0;
      });
      return {
        ...state,
        ranking: action.ranking
      };
    // case TAG_ADD_TAGS:
    //   /*
    //   * use this action if there are an initial set of tags passed
    //   * through when the page is first loaded
    //   */
    //   return {
    //     ...state,
    //     tags: action.tags
    //   };
    case TAG_ADD_SINGLE_TAG:
      if (state.isInitialTag) {
        return {...state, tags: [action.tag], isInitialTag: false, autocompleteOptions: []};
      }
      return {
        ...state,
        tags: uniqBy([...state.tags, action.tag], 'displayName'),
        isInitialTag: action.isInitialTag,
        autocompleteOptions: []
      };
    case TAG_REMOVE_TAG:
      let newTags = state.tags.filter(tag => {
        return tag.displayName !== action.displayName;
      });
      let isInitialTag = false;
      if (newTags.length === 0) {
        newTags = [initialState.defaultTag];
        isInitialTag = true;
      }
      return {
        ...state,
        tags: newTags,
        error: '',
        isInitialTag
      };
    case RESET_TAGS:
      return {
        ...state,
        tags: [initialState.defaultTag],
        isInitialTag: true,
        autocompleteOptions: []
      };
    case SET_SEARCH_STRING:
      return {
        ...state,
        searchString: action.searchString
      };
    case CLEAR_SEARCH_STRING:
      return {
        ...state,
        searchString: '',
        autocompleteOptions: []
      };
    case SET_AUTOCOMPLETE_ERROR:
      return {
        ...state,
        autocompleteError: action.error,
        inAutoCompleteSearch: false
      };
    case SET_AUTOCOMPLETE_OPTIONS:
      return {
        ...state,
        autocompleteOptions: action.items,
        inAutoCompleteSearch: false
      };
    case SET_AUTOCOMPLETE_IN_SEARCH:
      return {
        ...state,
        inAutoCompleteSearch: true
      };
    case SAVE_SEARCH_RESULT_ID:
      return {
        ...state,
        resultId: action.id
      };
    case SAVE_BUCKET_ID:
      return {
        ...state,
        bucketId: action.id
      };
    case SAVE_SOCKET_CONNECTION_ID:
      return {
        ...state,
        socketConnectionId: action.id
      };
    case SET_FINGERPRINT:
      return {
        ...state,
        fingerprint: action.fingerprint
      };
    case CLEAR_FEED:
      return {
        ...state,
        displayedItems: [],
        items: [],
        ranking: {},
        providers: {},
        relatedItems: [],
        feedEnd: false
      };
    case TILES_REMOVE_TILE:
      const iterator = item => {
        return item.id !== action.id;
      };
      const displayed = state.displayedItems.filter(iterator);
      const backlog = state.items.filter(iterator);
      return {
        ...state,
        displayedItems: displayed,
        items: backlog
      };
    case REGISTER_PROVIDER:
      const providers = state.providers;
      providers[action.provider] = action.complete;
      const complete = every(providers, (done) => done);
      return {
        ...state,
        providers,
        searchComplete: complete,
        loading: !complete
      };
    default:
      return state;
  }
}

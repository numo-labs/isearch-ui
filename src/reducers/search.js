'use strict';

import {
  RECEIVE_SEARCH_RESULT,
  BUSY_SEARCHING,
  // TAG_ADD_TAGS,
  TAG_REMOVE_TAG,
  TAG_ADD_SINGLE_TAG,
  RESET_TAGS,
  FILTER_ON_CLICK,
  TILES_ADD_TILES,
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
  UPDATE_DISPLAYED_ITEMS
} from '../constants/actionTypes';

import { mockTiles } from './utils/mockData.js';
// import {
//   shuffleTilesIntoResults,
//   getPackages,
//   getTiles
// } from './utils/helpers.js';
import union from 'lodash.union';
import uniqBy from 'lodash.uniqby';

export const initialState = {
  defaultTag: {
    displayName: 'Top inspiration',
    id: 'marketing:homepage.dk.spies'
  },
  scrollPage: 6,
  fingerprint: '',
  bucketId: '',
  resultId: '',
  displayedItems: [],
  items: [],
  bucketCount: 0,
  status: undefined,
  loading: false,
  tags: [],
  filterVisibleState: {},
  tiles: [],
  searchString: '',
  error: '',
  autocompleteError: '',
  autocompleteOptions: [],
  inAutoCompleteSearch: false, // use to show loading spinner
  departureAirport: '',
  departureDate: '',
  passengerBirthdays: [],
  // durationTitle: '2 uger',
  // bucketId: '8aeb3560-0b92-11e6-9605-eb677966096c'
  isInitialTag: false,
  socketConnectionId: ''
};

// function scrambleSearchItems (items, state, append) {
//   const packages = getPackages(items);
//   const tiles = getTiles(items);
//   return shuffleTilesIntoResults(packages, append ? state.tiles : tiles.concat(state.tiles)); // add filters back in
// }

export default function search (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SEARCH_RESULT:
      // const scrambled = scrambleSearchItems(action.items, state, action.append);
      // const displayedItems = action.append ? state.displayedItems.concat(scrambled) : scrambled;
      const items = state.displayedItems.length > 0 ? action.items : action.items.concat(mockTiles); // add in the filters if it is the inital search
      const itemsToDisplay = uniqBy(union(state.items, items), (a) => {
        if (a.packageOffer) {
          return a.packageOffer.provider.reference;
        } else if (a.tile) {
          return a.tile.id;
        }
      });
      const display = state.displayedItems.length < 30 ? itemsToDisplay.slice(0, 30) : state.displayedItems;
      return {
        ...state,
        items: itemsToDisplay,
        displayedItems: display,
        loading: false,
        error: ''
      };
    case UPDATE_DISPLAYED_ITEMS:
      return {
        ...state,
        displayedItems: action.items,
        scrollPage: state.scrollPage + 1
      };
    case BUSY_SEARCHING:
      return {
        ...state,
        loading: action.isBusy
      };
    case SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
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
        return {...state, tags: [action.tag], isInitialTag: false};
      }
      return {
        ...state,
        tags: uniqBy([...state.tags, action.tag], 'displayName'),
        isInitialTag: action.isInitialTag
      };
    case TAG_REMOVE_TAG:
      const newTags = state.tags.filter(tag => {
        return tag.displayName !== action.displayName;
      });
      return {
        ...state,
        tags: newTags,
        error: ''
      };
    case RESET_TAGS:
      return {
        ...state,
        tags: [initialState.defaultTag],
        isInitialTag: true
      };
    case FILTER_ON_CLICK:
      return {
        ...state,
        filterVisibleState: {
          ...state.filterVisibleState,
          [action.displayName]: false
        },
        tiles: state.tiles.filter(tile => tile.displayName !== action.displayName)
      };
    case TILES_ADD_TILES:
      const tileArray = action.tileArray === undefined ? mockTiles : action.tileArray;
      const filterVisibleState = tileArray.reduce((obj, tile) => {
        if (tile.tile.type === 'filter') {
          obj[tile.tile.displayName] = true;
        }
        return obj;
      }, {});
      return {
        ...state,
        filterVisibleState,
        tiles: tileArray
      };
    case SET_SEARCH_STRING:
      return {
        ...state,
        searchString: action.searchString
      };
    case CLEAR_SEARCH_STRING:
      return {
        ...state,
        searchString: ''
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
        items: []
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
    default:
      return state;
  }
}

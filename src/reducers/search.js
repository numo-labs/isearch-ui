'use strict';

import {
  RECEIVE_SEARCH_RESULT,
  BUSY_SEARCHING,
  // TAG_ADD_TAGS,
  TAG_REMOVE_TAG,
  TAG_ADD_SINGLE_TAG,
  FILTER_ON_CLICK,
  TILES_ADD_TILES,
  SET_SEARCH_STRING,
  SEARCH_ERROR,
  SET_AUTOCOMPLETE_ERROR,
  SET_AUTOCOMPLETE_OPTIONS,
  SET_AUTOCOMPLETE_IN_SEARCH,
  CLEAR_SEARCH_STRING,
  UPDATE_HEADER_TITLES,
  SAVE_SEARCH_RESULT_ID,
  SAVE_SOCKET_CONNECTION_ID,
  SET_FINGERPRINT,
  SAVE_BUCKET_ID
  // CLEAR_FEED
} from '../constants/actionTypes';

import { mockTiles } from './utils/mockData.js';
import {
  shuffleTilesIntoResults,
  getPackages,
  getTiles
} from './utils/helpers.js';
import _ from 'lodash';

export const initialState = {
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
  addMessageVisible: false,
  searchString: '',
  error: '',
  autocompleteError: '',
  autocompleteOptions: [],
  inAutoCompleteSearch: false, // use to show loading spinner
  numberOfChildren: 0,
  childAge1: '',
  childAge2: '',
  childAge3: '',
  childAge4: '',
  departureAirport: '',
  duration: '',
  departureDate: '',
  passengerBirthdays: [],
  numberOfChildrenTitle: '0',
  numberOfAdultsTitle: '2',
  // durationTitle: '2 uger',
  // bucketId: '8aeb3560-0b92-11e6-9605-eb677966096c'
  durationTitle: '1 uger',
  isInitialTag: false,
  socketConnectionId: ''
};

function scrambleSearchItems (items, state, append) {
  const packages = getPackages(items);
  const tiles = getTiles(items);
  return shuffleTilesIntoResults(packages, append ? state.tiles : tiles.concat(state.tiles)); // add filters back in
}

export default function search (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SEARCH_RESULT:
      const scrambled = scrambleSearchItems(action.items, state, action.append);
      const displayedItems = action.append ? state.displayedItems.concat(scrambled) : scrambled;
      const items = _.uniqBy(_.union(state.items, action.items), (a) => {
        if (a.packageOffer) {
          return a.packageOffer.provider.reference;
        } else if (a.tile) {
          return a.tile.id;
        }
      });
      return {
        ...state,
        displayedItems,
        items,
        loading: false,
        error: ''
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
        tags: _.uniqBy([...state.tags, action.tag], 'displayName'),
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
    case UPDATE_HEADER_TITLES:
      return {
        ...state,
        numberOfAdultsTitle: action.numberOfAdults,
        numberOfChildrenTitle: action.numberOfChildren,
        durationTitle: action.duration
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
    // case CLEAR_FEED:
    //   return {
    //     ...state,
    //     displayedItems: initialState.displayedItems
    //   };
    default:
      return state;
  }
}

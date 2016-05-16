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
  SET_NUMBER_OF_ADULTS_TITLE,
  SET_NUMBER_OF_CHILDREN_TITLE,
  SET_DURATION_TITLE,
  SAVE_SEARCH_RESULT_ID
} from '../constants/actionTypes';

import { mockTiles } from './utils/mockData.js';
import {
  shuffleTilesIntoResults,
  getPackages,
  getTiles
} from './utils/helpers.js';
import _ from 'lodash';

export const initialState = {
  bucketId: '',
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
  durationTitle: '1 uger',
  isInitialTag: false
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
    case SET_NUMBER_OF_ADULTS_TITLE:
      return {
        ...state,
        numberOfAdultsTitle: action.numberOfAdultsTitle
      };
    case SET_NUMBER_OF_CHILDREN_TITLE:
      return {
        ...state,
        numberOfChildrenTitle: action.numberOfChildrenTitle
      };
    case SET_DURATION_TITLE:
      return {
        ...state,
        durationTitle: action.durationTitle
      };
    case SAVE_SEARCH_RESULT_ID:
      return {
        ...state,
        bucketId: action.id
      };
    default:
      return state;
  }
}

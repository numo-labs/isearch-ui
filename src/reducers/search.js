'use strict';

import {
  RECEIVE_SEARCH_RESULT,
  BUSY_SEARCHING,
  TAG_ADD_TAGS,
  TAG_REMOVE_TAG,
  TAG_ADD_SINGLE_TAG,
  FILTER_ON_CLICK,
  TILES_ADD_TILES,
  SHOW_ADD_MESSAGE,
  HIDE_ADD_MESSAGE,
  SET_SEARCH_STRING,
  UPDATE_DISPLAYED_ITEMS,
  SEARCH_ERROR
 } from '../constants/actionTypes';

import { mockTiles } from './utils/mockData.js';
import { shuffleMockedTilesIntoResultSet } from './utils/helpers.js';
import _ from 'lodash';

export const initialState = {
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
  error: ''
};

export default function search (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SEARCH_RESULT:
      const packageItems = action.initialSearch ? shuffleMockedTilesIntoResultSet(action.items, state.tiles) : action.items;
      const displayedItems = _.uniq(_.union(state.displayedItems, packageItems), (a) => a.offer.reference);
      const items = _.uniq(_.union(state.items, action.items), (a) => a.offer.reference);
      return {
        ...state,
        displayedItems,
        items,
        loading: false,
        error: ''
      };
    case UPDATE_DISPLAYED_ITEMS:
      const updatedTiles = shuffleMockedTilesIntoResultSet(action.items, state.tiles); // add the remaining tiles back in!
      return {
        ...state,
        displayedItems: updatedTiles
      };
    case BUSY_SEARCHING:
      return {
        ...state,
        loading: true
      };
    case SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case TAG_ADD_TAGS:
      /*
      * use this action if there are an initial set of tags passed
      * through when the page is first loaded
      */
      return {
        ...state,
        tags: action.tags
      };
    case TAG_ADD_SINGLE_TAG:
      return {
        ...state,
        tags: _.uniqBy([...state.tags, action.tag], 'displayName')
      };
    case TAG_REMOVE_TAG:
      const newTags = state.tags.filter(tag => {
        return tag.displayName !== action.displayName;
      });
      return {
        ...state,
        tags: newTags
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
        if (tile.type === 'filter') {
          obj[tile.displayName] = true;
        }
        return obj;
      }, {});
      return {
        ...state,
        filterVisibleState,
        tiles: tileArray
      };
    // case SHOW_ADD_MESSAGE:
    //   return ({
    //     ...state,
    //     addMessageVisible: true
    //   });
    // case HIDE_ADD_MESSAGE:
    //   return ({
    //     ...state,
    //     addMessageVisible: false
    //   });
    case SET_SEARCH_STRING:
      return {...state, searchString: action.searchString};
    default:
      return state;
  }
}

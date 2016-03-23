'use-strict';

import { FILTER_ON_CLICK, TILES_ADD_TILES } from '../constants/actionTypes';

const initialState = {
  filterVisibleState: {},
  tiles: []
};

export default function tiles (state = initialState, action) {
  switch (action.type) {
    case FILTER_ON_CLICK:
      return {
        ...state,
        filterVisibleState: {
          ...state.filterVisibleState,
          [action.tagName]: false
        }
      };
    case TILES_ADD_TILES:
      const filterVisibleState = action.tileArray.reduce((obj, tile) => {
        if (tile.type === 'filter') {
          obj[tile.bigWord] = true;
        }
        return obj;
      }, {});
      return {
        ...state,
        filterVisibleState,
        tiles: action.tileArray
      };
    default:
      return state;
  }
}

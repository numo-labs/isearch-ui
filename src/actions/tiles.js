import {
  FILTER_ON_CLICK,
  TILES_ADD_TILES,
  TAG_ADD_SINGLE_TAG
} from '../constants/actionTypes';

import { filterResults } from './search-results.js';

export const onYesFilter = (displayName, id) => (dispatch) => {
  dispatch(addSingleTag(displayName, id));
  dispatch(filterResults());
  return dispatch(onFilterClick(displayName));
};

/**
* Sets the filter visible state to false to hide the filter after it is clicked
*/
export const onFilterClick = (displayName) => { return {type: FILTER_ON_CLICK, displayName}; };
export const addTiles = (tileArray) => { return {type: TILES_ADD_TILES, tileArray}; };

export const addSingleTag = (displayName, id, filterString) => {
  return {
    type: TAG_ADD_SINGLE_TAG,
    tag: {
      displayName,
      colour: '#8EB8C4',
      id, // geo tags will just have 'geo' and amenity tags will have the full tag id e.g. amenity:wifi
      filterString // only for amenity tags e.g. outdoorpool - this will be used for filtering on the front end
    }
  };
};

export const addSearchStringTag = () => {
  return (dispatch, getState) => {
    const { search: { searchString } } = getState();
    return dispatch(addSingleTag(searchString, 'geo'));
  };
};

import { FILTER_ON_YES_FILTER, FILTER_ON_CLICK, TILES_ADD_TILES, TAG_ADD_SINGLE_TAG } from '../constants/actionTypes';

export const onYesFilter = (tagName) => (dispatch) => {
  dispatch(addSingleTag(tagName));
  return dispatch(onFilterClick(tagName));
};
export const onFilterClick = (tagName) => { return {type: FILTER_ON_CLICK, tagName}; };
export const addTiles = (tileArray) => { return {type: TILES_ADD_TILES, tileArray}; };
export const addSingleTag = (tagName) => { return {type: TAG_ADD_SINGLE_TAG, tag: {tagName, colour: '#8EB8C4'}}; };

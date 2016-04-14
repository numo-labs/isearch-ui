import { FILTER_ON_CLICK, TILES_ADD_TILES, TAG_ADD_SINGLE_TAG } from '../constants/actionTypes';

export const onYesFilter = (tagName, id) => (dispatch) => {
  dispatch(addSingleTag(tagName, id));
  // dispatch(filterResults());
  return dispatch(onFilterClick(tagName));
};
export const onFilterClick = (tagName) => { return {type: FILTER_ON_CLICK, tagName}; };
export const addTiles = (tileArray) => { return {type: TILES_ADD_TILES, tileArray}; };

export const addSingleTag = (tagName, id, filterString) => {
  return {
    type: TAG_ADD_SINGLE_TAG,
    tag: {
      tagName,
      colour: '#8EB8C4',
      id, // geo tags will just have 'geo' and amenity tags will have the full tag id e.g. amenity:wifi
      filterString // only for amenity tags e.g. outdoorpool - this will be used for filtering on the front end
    }
  };
};

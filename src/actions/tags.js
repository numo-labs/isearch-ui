import {
  TAG_ADD_TAGS,
  TAG_REMOVE_TAG,
  FILTER_ON_CLICK,
  TILES_ADD_TILES,
  TAG_ADD_SINGLE_TAG,
  CLEAR_SEARCH_STRING
} from '../constants/actionTypes';
import { filterResults } from './search-results.js';

/**
* TEMP FUNCTIONS TO ADD MOCK TAGS
*/

export function addTags (tags) {
  return {
    type: TAG_ADD_TAGS,
    tags: tags
  };
}

/**
* TEMP FUNCTIONS TO ADD MOCK TILES
*/

export function addTiles (tileArray) {
  return {
    type: TILES_ADD_TILES,
    tileArray
  };
}

/**
* Action to remove a tag and filter the results
*/

export function removeTag (displayName) {
  return (dispatch, getState) => {
    dispatch(deleteTag(displayName));
    return dispatch(filterResults());
  };
}

/**
* Action to dispatch remove tag action
*/

export function deleteTag (displayName) {
  return {
    type: TAG_REMOVE_TAG,
    displayName
  };
}

/**
* Action to add a tag from a filter and filter the results
*/

export const onYesFilter = (displayName, id) => (dispatch) => {
  dispatch(addSingleTag(displayName, id));
  dispatch(onFilterClick(displayName));
  return dispatch(filterResults());
};

/**
* Sets the filter visible state to false to hide the filter after it is clicked
* NB: May not be necessary any more if the tile is removed from the displayed items
*/
export const onFilterClick = (displayName) => { return {type: FILTER_ON_CLICK, displayName}; };

/**
* Action to add a tag either fron the search bar or a filterString
* If the tag already exists, it is not added
* If it doesn't exist, it is added and the results are filtered
*/

export const addSingleTag = (displayName, id, filterString) => {
  return (dispatch, getState) => {
    const { search: { tags } } = getState();
    const tagExists = tags.filter(tag => tag.displayName === displayName).length > 0;
    if (tagExists) {
      return;
    } else {
      dispatch(addTag(displayName, id, filterString));
      dispatch(filterResults());
    }
  };
};

export const addTag = (displayName, id, filterString) => {
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

/**
* Action to clear the search string
*/

export const clearSearchString = () => {
  return { type: CLEAR_SEARCH_STRING };
};

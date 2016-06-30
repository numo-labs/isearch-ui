import {
  TAG_ADD_TAGS,
  TAG_REMOVE_TAG,
  TILES_REMOVE_TILE,
  TAG_ADD_SINGLE_TAG,
  CLEAR_SEARCH_STRING,
  RESET_TAGS
} from '../constants/actionTypes';
import * as graphqlService from '../services/graphql';
import { startSearch } from './search-results.js';
import { analyticsAddTagObject, analyticsRemoveTagObject } from '../../lib/analytics-helper';

import { QUERY_AUTOCOMPLETE_INPUT } from '../constants/queries.js';

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
* Action to remove a tag and filter the results
*/

export function removeTag (displayName) {
  return (dispatch, getState) => {
    dispatch(deleteTag(displayName));
    const { search: { tags } } = getState();
    const currentTagsNames = tags.map((tag) => tag.displayName);
    dataLayer.push(analyticsRemoveTagObject(displayName, currentTagsNames));
    return dispatch(startSearch());
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
* Action to add a tag from a filter and launch a new search
*/

export const onYesFilter = (displayName, id) => (dispatch) => {
  return dispatch(addSingleTag(displayName, id, 'filter'));
};

export const searchForTag = (searchString) => (dispatch) => {
  const variables = {
    input: searchString,
    size: 1
  };
  graphqlService
    .query(QUERY_AUTOCOMPLETE_INPUT, variables)
    .then(json => {
      console.log('Autocomplete response', json);
      const { data: { viewer: { autocomplete } } } = json;
      if (autocomplete && autocomplete.items && autocomplete.items.length) {
        const tag = autocomplete.items[0];
        dispatch(addSingleTag(tag.label, tag.tagid));
      } else {
        dispatch(resetTags());
      }
    });
};

/**
* Action to add a tag either fron the search bar or a filterString
* If the tag already exists, it is not added
* If it doesn't exist, it is added and a new search is started
*/

export const addSingleTag = (displayName, id, context = 'search') => {
  return (dispatch, getState) => {
    const { search: { tags } } = getState();
    const tagExists = tags.filter(tag => tag.displayName === displayName).length > 0;
    const currentTagsNames = tags.map((tag) => tag.displayName);
    if (tagExists) {
      return;
    } else {
      dataLayer.push(analyticsAddTagObject(displayName, currentTagsNames, context));
      dispatch(addTag(displayName, id, false));
      dispatch(startSearch());
    }
  };
};

export const addTag = (displayName, id, isInitialTag) => {
  return {
    type: TAG_ADD_SINGLE_TAG,
    tag: {
      displayName,
      id // geo tags will just have 'geo' and amenity tags will have the full tag id e.g. amenity:wifi
    },
    isInitialTag
  };
};

/**
* Action to clear the search string
*/

export const clearSearchString = () => {
  return { type: CLEAR_SEARCH_STRING };
};
/**
* Action to reset all tags to empty
*/

export const resetTags = () => {
  return dispatch => {
    dispatch(resetToInitialTag());
    return dispatch(startSearch());
  };
};

export const resetToInitialTag = () => {
  return {
    type: RESET_TAGS
  };
};

/**
* Action to remove a tile from the displayed items
*/

export const removeTile = (id) => {
  return {
    type: TILES_REMOVE_TILE,
    id: id
  };
};

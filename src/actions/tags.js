import { TAG_ADD_TAGS, TAG_REMOVE_TAG } from '../constants/actionTypes';
import { filterResults } from './search-results.js';

export function addTags (tags) {
  return {
    type: TAG_ADD_TAGS,
    tags: tags
  };
}

export function removeTag (displayName) {
  return (dispatch, getState) => {
    dispatch(removeTag(displayName));
    return dispatch(filterResults());
  };
}

export function deleteTag (displayName) {
  return {
    type: TAG_REMOVE_TAG,
    displayName
  };
}

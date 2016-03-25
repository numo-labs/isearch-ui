import { TAG_ADD_TAGS, TAG_REMOVE_TAG } from '../constants/actionTypes';

export function addTags (tags) {
  return {
    type: TAG_ADD_TAGS,
    tags: tags
  };
}

export function removeTag (tagName) {
  return {
    type: TAG_REMOVE_TAG,
    tagName: tagName
  };
}

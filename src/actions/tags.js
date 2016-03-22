import { TAG_ADD_TAGS } from '../constants/actionTypes';

export function addTags (tags) {
  return {
    type: TAG_ADD_TAGS,
    tags: tags
  };
}

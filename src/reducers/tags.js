'use strict';
import { TAG_ADD_TAGS, TAG_REMOVE_TAG } from '../constants/actionTypes';

const initialState = {
  tags: []
};

export default function tags (state = initialState, action) {
    switch (action.type) {
      case TAG_ADD_TAGS:
        return {
          ...state,
          tags: action.tags
        };
      case TAG_REMOVE_TAG:
        const newTags = state.tags.filter(tag => {
          return tag.tagName !== action.tagName;
        });
        return {
          ...state,
          tags: newTags
        };
      default:
        return state;
    }
}

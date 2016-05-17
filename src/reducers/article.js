'use strict';

import { VIEW_ARTICLE } from '../constants/actionTypes';

const initialState = {
  articleContent: {}
};

export default function article (state = initialState, action) {
  switch (action.type) {
    case VIEW_ARTICLE:
      return {
        ...state,
        articleContent: action.content
      };
    default:
      return state;
  }
}

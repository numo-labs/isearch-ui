'use strict';

import { VIEW_ARTICLE, VIEW_SEARCH } from '../constants/actionTypes';

const initialState = {
  articlePage: false,
  articleContent: {}
};

export default function article (state = initialState, action) {
  switch (action.type) {
    case VIEW_ARTICLE:
      return {...state, articlePage: true, articleContent: action.content};
    case VIEW_SEARCH:
      return {...state, articlePage: false, articleContent: {}};
    default:
      return state;
  }
}

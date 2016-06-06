'use strict';

import { VIEW_ARTICLE } from '../constants/actionTypes';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  articleContent: {},
  viewedArticles: []
};

export default function article (state = initialState, action) {
  switch (action.type) {
    case VIEW_ARTICLE:
      return {
        ...state,
        articleContent: action.content,
        viewedArticles: state.viewedArticles.concat([action.content.id])
      };
    case LOCATION_CHANGE:
      return {
        ...initialState,
        viewedArticles: state.viewedArticles
      };
    default:
      return state;
  }
}

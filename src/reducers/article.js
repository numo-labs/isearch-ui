'use strict';

import { VIEW_ARTICLE } from '../constants/actionTypes';
import { LOCATION_CHANGE } from 'react-router-redux';

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
    case LOCATION_CHANGE:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

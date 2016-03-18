'use strict';

import { SHOW_ADD_MESSAGE, HIDE_ADD_MESSAGE, QUERY_FETCH_SEARCH_RESULTS } from '../actionTypes.js';

const initialState = {
  addMessageVisible: false,
  loading: true
};

export default function home (state = initialState, action) {
  switch (action.type) {
    case QUERY_FETCH_SEARCH_RESULTS:
      return ({
        ...state,
        loading: false
      });
    case SHOW_ADD_MESSAGE:
      return ({
        ...state,
        addMessageVisible: true
      });
    case HIDE_ADD_MESSAGE:
      return ({
        ...state,
        addMessageVisible: false
      });
    default:
      return state;
  }
}

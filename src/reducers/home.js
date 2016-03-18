'use strict';

import { SHOW_ADD_MESSAGE, HIDE_ADD_MESSAGE } from '../actionTypes.js';

const initialState = {
  addMessageVisible: false
};

export default function home (state = initialState, action) {
  switch (action.type) {
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

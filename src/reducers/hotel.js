'use strict';

import { VIEW_HOTEL, VIEW_SEARCH } from '../constants/actionTypes';

const initialState = {
  hotelPage: false
};

export default function hotel (state = initialState, action) {
  switch (action.type) {
    case VIEW_HOTEL:
      return {
        ...state,
        hotelPage: true
      };
    case VIEW_SEARCH:
      return {
        ...state,
        hotelPage: false
      };
    default:
      return state;
  }
}

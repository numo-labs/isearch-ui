'use strict';

import { UPDATE_WEATHER } from '../constants/actionTypes';

const initialState = {
  displayName: '',
  high: [],
  image: '',
  low: [],
  rainfree: [],
  sunhours: [],
  watertemp: []
};

export default function article (state = initialState, action) {
  switch (action.type) {
    case UPDATE_WEATHER:
      const weather = action.data;
      return {
        ...state,
        ...weather
      };
    default:
      return state;
  }
}

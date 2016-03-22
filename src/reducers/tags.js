'use strict';
import { TAG_ADD_TAGS } from '../constants/actionTypes';

const initialState = {
  tags: []
};

export default function tags (state = initialState, action) {
  console.log(action);
    switch (action.type) {
      case TAG_ADD_TAGS:
        console.log('HELLO');
        return {
          ...state,
          tags: action.tags
        };
      default:
        return state;
    }
}

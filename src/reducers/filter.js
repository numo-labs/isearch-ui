'use-strict';

import { YES_FILTER, NO_FILTER, REMOVE_TAG } from '../actionTypes.js';

const initialState = {
  tags: [
    {
      tagName: 'Sunwing Family Resort',
      colour: '#81C8BE'
    },
    {
      tagName: 'Kids',
      colour: '#8EB8C4'
    },
    {
      tagName: 'Mediterranean',
      colour: '#B9CAA8'
    },
    {
      tagName: 'Turkey',
      colour: '#B9CAA8'
    }
  ],
  filters: {
    'Sport & Adventure': true,
    'Nightlife': true,
    'Food & Drink': true,
    'Sights': true
  }
};

export default function filter (state = initialState, action) {
  const newTags = [...state.tags, {tagName: action.tagName, colour: '#8EB8C4'}];
  switch (action.type) {
    case YES_FILTER:
      return {
        ...state,
        tags: newTags,
        filters: {
          ...state.filters,
          [action.tagName]: false
        }
      };
    case NO_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.tagName]: false
        }
      };
    case REMOVE_TAG:
      const tagsNew = state.tags.filter(tag => {
        return tag.tagName !== action.tagName;
      });
      return {
        ...state,
        tags: tagsNew
      };
    default:
      return state;
  }
}

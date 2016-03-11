'use-strict';

import { YES_FILTER, NO_FILTER, REMOVE_TAG } from '../action-types.js';

const initialState = {
  filterVisible: true,
  tags: [
    {
      tagName: 'Sunwing Family Resort',
      colour: '#81C8BE'
    },
    {
      tagName: 'Nightlife',
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
  ]
};

export default function filter (state = initialState, action) {
  switch (action.type) {
    case YES_FILTER:
      const tagsAdded = [...state.tags, {tagName: action.tagName, colour: '#8EB8C4'}];
      console.log('TAGS', tagsAdded);
      console.log('state.tags', state.tags);
      return ({
        ...state,
        filterVisible: false,
        tags: tagsAdded
      });
    case NO_FILTER:
      return ({
        ...state,
        filterVisible: false
      });
    case REMOVE_TAG:
      const newTags = state.tags.filter(tag => {
        return tag.tagName !== action.tagName;
      });
      console.log(newTags);
      return {
        ...state,
        tags: newTags
      };
    default:
      return state;
  }
}

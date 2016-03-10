import { REMOVE_TAG } from '../action-types.js';

const initialState = {
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

export default function tags (state = initialState, action) {
  switch (action.type) {
    case REMOVE_TAG :
      const newTags = state.tags.filter(tag => {
        return tag.tagName !== action.tagName;
      })
      console.log(newTags);
      return {
        ...state,
        tags: newTags
      };
    default:
      return state;
  }
}

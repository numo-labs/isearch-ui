import { combineReducers } from 'redux';
import search from './search.js';
import article from './article.js';
import hotel from './hotel.js';

const rootReducer = combineReducers({
  search,
  hotel,
  article
});

export default rootReducer;

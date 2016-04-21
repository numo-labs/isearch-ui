import { combineReducers } from 'redux';
import search from './search.js';
import article from './article.js';

const rootReducer = combineReducers({
  search,
  article
});

export default rootReducer;

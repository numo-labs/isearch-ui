import { combineReducers } from 'redux';
import home from './home';
import filter from './filter.js';
import search from './search.js';

const rootReducer = combineReducers({
  home,
  filter,
  search
});

export default rootReducer;

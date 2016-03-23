import { combineReducers } from 'redux';
import tags from './tags';
import search from './search';
import tiles from './tiles';
import home from './home';

const rootReducer = combineReducers({
  tags,
  search,
  tiles,
  home
});

export default rootReducer;

import { combineReducers } from 'redux';
import tags from './tags';
import search from './search';

const rootReducer = combineReducers({
  tags,
  search
});

export default rootReducer;

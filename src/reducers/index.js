import { combineReducers } from 'redux';
import home from './home';
import filter from './filter';
const rootReducer = combineReducers({
  home,
  filter
});

export default rootReducer;

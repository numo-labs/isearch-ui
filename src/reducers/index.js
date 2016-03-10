import { combineReducers } from 'redux';
import home from './home';
import tags from './tags';
const rootReducer = combineReducers({
  home,
  tags
});

export default rootReducer;

import { combineReducers } from 'redux';
import search from './search.js';
import hotel from './hotel.js';

const rootReducer = combineReducers({
  search,
  hotel
});

export default rootReducer;

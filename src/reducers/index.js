import { combineReducers } from 'redux';
import search from './search.js';
import article from './article.js';
import hotel from './hotel.js';
import travelInfo from './travel-info';

const rootReducer = combineReducers({
  search,
  hotel,
  article,
  travelInfo
});

export default rootReducer;

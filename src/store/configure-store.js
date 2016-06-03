import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory as history } from 'react-router';
import { RECEIVE_SEARCH_RESULT } from '../constants/actionTypes.js';
// import { history } from '../history/configure-history.js';

const logger = createLogger({
  predicate: (getState, action) => action.type !== RECEIVE_SEARCH_RESULT
});

const middlewares = [thunkMiddleware, logger, routerMiddleware(history)];

if (process.env.NODE_ENV === `development`) {
  const createLogger = require(`redux-logger`);
  const logger = createLogger();
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}

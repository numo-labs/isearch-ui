import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger,
  routerMiddleware(browserHistory)
)(createStore);

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}

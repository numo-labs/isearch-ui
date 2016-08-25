// npm
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'react-router-scroll';
// components
import ISearch from '../containers/isearch.js';
import ArticleFullPage from '../containers/article.js';
import HotelPage from '../containers/hotel';
import App from '../components/app';
import EditDetails from '../containers/editDetails';
import DestinationFullPage from '../containers/destination';

// store
import configureStore from '../store/configure-store.js';
const store = configureStore();

// for when browserHistory is used history
// import { history } from '../history/configure-history.js';

const syncedHistory = syncHistoryWithStore(hashHistory, store);

// web socket service
import * as websocketService from '../services/websockets.js';
// client fingerprint service
import * as fingerprintService from '../services/fingerprint.js';

const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);

export default class Root extends Component {

  componentWillMount () {
    let currentPath = store.getState().routing.locationBeforeTransitions.pathname;
    this.socket = websocketService.initialise(actionCreatorBinder, currentPath);
    fingerprintService.initialise(actionCreatorBinder);
  }

  componentWilUnmount () {
    if (this.socket) { this.socket.destroy(); }
  }

  determineScrollBehaviour (prev, curr) {
    if (!curr) {
      return false;
    }
    return curr.location.pathname.indexOf('hotel') > -1 ? [0, 0] : true; // scroll to top for hotel route
  }

  render () {
    return (
      <Provider store={store}>
        <Router history={syncedHistory} render={applyRouterMiddleware(useScroll(this.determineScrollBehaviour))}>
          <Route path='/' component={App}>
            <IndexRoute component={ISearch} />
            <Route path='search/:bucketId' component={ISearch} />
            <Route path='article/:bucketId/:itemId' component={ArticleFullPage} />
            <Route path='hotel/:bucketId/:itemId' component={HotelPage} />
            <Route path='destination/:bucketId/:itemId' component={DestinationFullPage} />
            <Route path='editDetails' component={EditDetails} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

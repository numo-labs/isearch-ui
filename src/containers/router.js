// npm
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// components
import ISearch from '../containers/isearch.js';
import ArticleFullPage from '../containers/article.js';
import HotelPage from '../containers/hotel';
import App from '../components/app';

// store
import { store } from '../store/configure-store.js';
const history = syncHistoryWithStore(browserHistory, store);

// web socket service
import * as websocketService from '../services/websockets.js';

export default class Root extends Component {

  componentDidMount () {
    websocketService.initialise((actions) => bindActionCreators(actions, store.dispatch));
  }

  render () {
    return (
      <Router history={history}>
        <Route path='/' component={App} ignoreScrollBehavior>
          <IndexRoute component={ISearch}/>
          <Route path='search/:bucketId' component={ISearch}/>
          <Route path='article/:bucketId/:itemId' component={ArticleFullPage} />
          <Route path='hotel/:bucketId/:itemId' component={HotelPage} />
        </Route>
      </Router>
    );
  }
}

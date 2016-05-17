// npm
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// components
import ISearch from '../containers/isearch.js';
import ArticleFullPage from '../containers/article.js';
import HotelPage from '../containers/hotel';

// store
import configureStore from '../store/configure-store.js';
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={ISearch}/>
          <Route path='search/:bucketId' component={ISearch}/>
          <Route path='article/:bucketId/:itemId' component={ArticleFullPage}/>
          <Route path='hotel/:bucketId/:itemId' component={HotelPage}/>
        </Router>
      </Provider>
    );
  }
}

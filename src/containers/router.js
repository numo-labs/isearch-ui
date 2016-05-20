// npm
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// components
import ISearch from '../containers/isearch.js';
import ArticleFullPage from '../containers/article.js';
import HotelPage from '../containers/hotel';
import App from '../components/app';

// store
import configureStore from '../store/configure-store.js';
const store = configureStore();

// for when browserHistory is used history
// import { history } from '../history/configure-history.js';

const syncedHistory = syncHistoryWithStore(hashHistory, store);

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={syncedHistory}>
          <Route path='/' component={App} ignoreScrollBehavior>
            <IndexRoute component={ISearch}/>
            <Route path='search/:bucketId' component={ISearch}/>
            <Route path='article/:bucketId/:itemId' component={ArticleFullPage} />
            <Route path='hotel/:bucketId/:itemId' component={HotelPage} />
          </Route>
        </Router>
      </Provider>
    );
  }
}
import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import ISearch from '../containers/isearch.js';
import ArticleFullPage from '../containers/article.js';

export default class ISearchRouter extends Component {
  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={ISearch}/>
        <Route path='article/:id' component={ArticleFullPage}/>
      </Router>
    );
  }
}

  // <Route path='article/:id' component={ArticleFullPage}/>

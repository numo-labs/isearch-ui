import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import ISearch from '../containers/isearch.js';
import ArticleFullPage from '../containers/article.js';
import HotelPage from '../containers/hotel';

export default class ISearchRouter extends Component {
  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={ISearch}/>
        <Route path='search/:bucketId' component={ISearch}/>
        <Route path='article/:bucketId/:itemId' component={ArticleFullPage}/>
        <Route path='hotel/:bucketId/:itemId' component={HotelPage}/>
      </Router>
    );
  }
}

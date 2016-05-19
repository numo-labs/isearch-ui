// npm
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Router from './router.js';

// store
import { store } from '../store/configure-store.js';

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}

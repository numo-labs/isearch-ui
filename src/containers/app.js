// npm
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

// store
import { store } from '../store/configure-store.js';

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}

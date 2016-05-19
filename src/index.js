import React from 'react';
import ReactDOM from 'react-dom';
import Router from './containers/router.js';

require('./normalise.css');

const rootElement = document.getElementById('container');

ReactDOM.render(
  <Router />,
  rootElement
);

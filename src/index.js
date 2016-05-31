import React from 'react';
import ReactDOM from 'react-dom';
// import Router from './containers/router.js';
import Demo from './demo.js';
require('./normalise.css');

const rootElement = document.getElementById('container');

ReactDOM.render(
  <Demo />,
  rootElement
);

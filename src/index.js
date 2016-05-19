import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app.js';

require('./normalise.css');

const rootElement = document.getElementById('container');

ReactDOM.render(
  <App />,
  rootElement
);

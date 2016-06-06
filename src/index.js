import React from 'react';
import ReactDOM from 'react-dom';
import Router from './containers/router.js';
import moment from 'moment';

moment.locale('da'); // TODO: auto-detect;

require('./normalise.css');

const rootElement = document.getElementById('container');

ReactDOM.render(
  <Router />,
  rootElement
);

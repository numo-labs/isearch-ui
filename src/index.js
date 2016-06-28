import React from 'react';
import ReactDOM from 'react-dom';
import Router from './containers/router.js';
import moment from 'moment';

moment.locale('da'); // TODO: auto-detect;

require('./normalise.css');

const rootElement = document.getElementById('container');

import traceable from './utils/debugger';
import Justice from './utils/justice.all';
const justice = Justice();

// input up, up, down, down, left, right, left, right, b, a
// or on mobile up, up, down, down, left, right, left, right, tap, tap, tap
traceable(() => {
  justice.init({
    metrics: {
      domInteractive: { budget: 250 },
      domComplete: { budget: 800 },
      pageLoad: { budget: 2000 },
      tracey: { },
      logs: { }
    },
    warnThreshold: 0.08,
    showFPS: true,
    chartType: 'spline'
  });
});

ReactDOM.render(
  <Router />,
  rootElement
);

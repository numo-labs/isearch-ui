import { expect } from 'chai';
import React from 'react';
import { Route, Router, createMemoryHistory } from 'react-router';
import { render, unmountComponentAtNode } from 'react-dom';
import App from '../../src/components/app';

describe('Containers', function () {
  describe('Router', function () {
    let node;
    beforeEach(function () {
      node = document.createElement('div');
    });

    afterEach(function () {
      unmountComponentAtNode(node);
    });

    it('renders routes', function (done) {
      render((
        <Router history={createMemoryHistory('/')}>
          <Route path='/' component={App} />
        </Router>
      ), node, function () {
        console.log('--->', node);
        expect(node.textContent).to.equal('');
        done();
      });
    });
  });
});

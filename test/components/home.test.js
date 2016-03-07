import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import expect from 'expect';

import Home from '../../src/components/home/index.js';

function setup (propOverrides) {
  const props = Object.assign({
    name: 'Jack'
  }, propOverrides);

  const home = <Home {...props} />;

  const renderer = TestUtils.createRenderer();
  renderer.render(home);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    renderer: renderer,
    output: output
  };
}

describe('components', function () {
  jsdom();

  describe('Home', function () {
    it('should render the Home container', function (done) {
      const { output } = setup({name: 'Jimmy'});
      expect(output.type).toBe('div');
      done();
    });
  });
});

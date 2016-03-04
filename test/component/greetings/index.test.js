import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import expect from 'expect';

import Greetings from '../../../src/component/greetings';

function setup (propOverrides) {
  const props = Object.assign({
    name: 'Jack'
  }, propOverrides);

  const greetings = <Greetings {...props} />;

  const renderer = TestUtils.createRenderer();
  renderer.render(greetings);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    renderer: renderer,
    output: output
  };
}

describe('components', function () {
  jsdom();

  describe('Greetings', function () {
    it('should render the Greetings container', function (done) {
      const { output } = setup({name: 'Jimmy'});
      expect(output.type).toBe('div');
      done();
    });
  });
});

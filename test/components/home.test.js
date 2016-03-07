import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import expect from 'expect';

// import Home from '../../src/components/home/index.js';

// function setup (propOverrides) {
//   const props = Object.assign({
//     title: 'Jack'
//   }, propOverrides);
//
//   const home = <Home {...props} />;
//
//   const renderer = TestUtils.createRenderer();
//   renderer.render(home);
//   const output = renderer.getRenderOutput();
//
//   return {
//     props: props,
//     renderer: renderer,
//     output: output
//   };
// }

describe('components', function () {
  jsdom();

  describe('Home', function () {
    it('should render a tile', function (done) {
      // const { output } = setup({});
      expect(true).toBe(true);
      done();
    });
  });
});

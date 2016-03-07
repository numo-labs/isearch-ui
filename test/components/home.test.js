import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import expect from 'expect';

import SearchTile from '../../src/components/search-tile/index.js';

function setup (propOverrides) {
  const props = Object.assign({
    title: 'Jack'
  }, propOverrides);

  const tile = <SearchTile {...props} />;

  const renderer = TestUtils.createRenderer();
  renderer.render(tile);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    renderer: renderer,
    output: output
  };
}

describe('components', function () {
  jsdom();

  describe('SearchTile', function () {
    it('should render a tile', function (done) {
      const { output } = setup({title: 'Jimmy', width: 3});
      expect(output.type).toBe('div');
      done();
    });
  });
});

'use strict';

import { shuffleMockedTilesIntoResultSet } from '../../src/reducers/utils/helpers.js';
import { expect } from 'chai';

describe('Tile Helpers', () => {
  it('shuffleMockedTilesIntoResultSet: returns a new array with the new elements added with the original array left untouched', (done) => {
    var a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    var b = [1, 2, 3];
    var res = shuffleMockedTilesIntoResultSet(a, b);
    expect(res).to.deep.equal([1, 'a', 'b', 'c', 2, 'd', 'e', 'f', 3, 'g', 'h', 'i']);
    expect(a).to.equal(a); // check no mutation
    done();
  });
});

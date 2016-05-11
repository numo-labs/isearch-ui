'use strict';

import { shuffleTilesIntoResults } from '../../src/reducers/utils/helpers.js';
import { expect } from 'chai';

describe('Tile Helpers', () => {
  it('shuffleTilesIntoResults: returns a new array with the new elements added with the original array left untouched', (done) => {
    var a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    var b = [1, 2, 3];
    var res = shuffleTilesIntoResults(a, b);
    expect(res).to.deep.equal([ 'a', 'b', 'c', 'd', 1, 'e', 'f', 'g', 2, 'h', 'i', 3 ]);
    expect(a).to.equal(a); // check no mutation
    done();
  });
});

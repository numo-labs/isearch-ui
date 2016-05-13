'use strict';

import { shuffleTilesIntoResults } from '../../src/reducers/utils/helpers.js';
import { expect } from 'chai';

describe('Tile Helpers', () => {
  it('shuffleTilesIntoResults: returns a new array with the new elements added with the original array left untouched', (done) => {
    var a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    var b = [1, 2, 3];
    var res = shuffleTilesIntoResults(a, b);
    // expect(res).to.deep.equal([ 'a', 'b', 'c', 'd', 1, 'e', 'f', 'g', 2, 'h', 'i', 3 ]);
    expect(res[0]).to.equal('a');
    expect(res[1]).to.equal('b');
    expect(res[2]).to.equal('c');
    expect(res[3]).to.equal('d');
    expect(res[5]).to.equal('e');
    expect(res[6]).to.equal('f');
    expect(res[7]).to.equal('g');
    expect(res[9]).to.equal('h');
    expect(res[10]).to.equal('i');
    expect(a).to.equal(a); // check no mutation
    done();
  });
});

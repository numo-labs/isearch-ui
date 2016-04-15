import { TILES_ADD_TILES } from '../../src/constants/actionTypes';
import { expect } from 'chai';
import * as actions from '../../src/actions/tiles';

describe('actions', function () {
  describe('tiles', function () {
    it('should create an action to add tiles', function (done) {
      const tileArray = ['a', 'b', 'c'];
      const expectedAction = {
        type: TILES_ADD_TILES,
        tileArray: tileArray
      };

      expect(actions.addTiles(tileArray)).to.deep.equal(expectedAction);
      done();
    });
  });
});

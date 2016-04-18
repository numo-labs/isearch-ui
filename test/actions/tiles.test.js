import { TILES_ADD_TILES, TAG_ADD_SINGLE_TAG, FILTER_ON_CLICK } from '../../src/constants/actionTypes';
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
  describe('addSingleTag', function () {
    it('should create an action to add a single tag', function (done) {
      const expectedAction = {
        type: TAG_ADD_SINGLE_TAG,
        tag: {
          displayName: 'test',
          colour: '#8EB8C4',
          filterString: 'test',
          id: 'test'
        }
      };
      expect(actions.addSingleTag('test', 'test', 'test')).to.deep.equal(expectedAction);
      done();
    });
  });
  describe('onFilterClick', function () {
    it('should create an action to remove a filter once clicked', function (done) {
      const expectedAction = {
        type: FILTER_ON_CLICK,
        displayName: 'test'
      };
      expect(actions.onFilterClick('test')).to.deep.equal(expectedAction);
      done();
    });
  });
});

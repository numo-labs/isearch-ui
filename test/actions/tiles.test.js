<<<<<<< HEAD
import { TILES_ADD_TILES, TAG_ADD_SINGLE_TAG } from '../../src/constants/actionTypes';
=======
import { TILES_ADD_TILES, TAG_ADD_SINGLE_TAG, FILTER_ON_CLICK } from '../../src/constants/actionTypes';
>>>>>>> master
import { expect } from 'chai';
import * as actions from '../../src/actions/tiles';
import simple from 'simple-mock';
import configureMockStore from './test-helpers';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

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
      const tagName = 'test';
      const expectedAction = {
        type: TAG_ADD_SINGLE_TAG,
        tag: {
          tagName: tagName,
          colour: '#8EB8C4'
        }
      };
      expect(actions.addSingleTag(tagName)).to.deep.equal(expectedAction);
      done();
    });
  });
  describe('onFilterClick', function () {
    it('should create an action to remove a filter once clicked', function (done) {
      const tagName = 'test';
      const expectedAction = {
        type: FILTER_ON_CLICK,
        tagName: tagName
      };
      expect(actions.onFilterClick(tagName)).to.deep.equal(expectedAction);
      done();
    });
  });
});

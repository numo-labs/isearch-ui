import { TAG_ADD_TAGS } from '../../src/constants/actionTypes';
import { expect } from 'chai';
import reducer from '../../src/reducers/tags';


describe('reducers', function () {
  describe('tags', function () {
    it('should return the initial state', function (done) {
      const initialState = reducer(undefined, {});
      const expectedState = {
        tags: []
      };
      expect(initialState).to.deep.equal(expectedState);
      done();
    });
    it('action TAG_ADD_TAGS should add tags to our state', function (done) {
      const initialState = reducer(undefined, {type: TAG_ADD_TAGS, tags: ['a', 'b', 'c']});
      const expectedState = {
        tags: ['a', 'b', 'c']
      };
      expect(initialState).to.deep.equal(expectedState);
      done();
    });
  });
});

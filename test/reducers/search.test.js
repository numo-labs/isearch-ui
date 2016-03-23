import { RECEIVE_SEARCH_RESULT, BUSY_SEARCHING } from '../../src/constants/actionTypes';
import { expect } from 'chai';
import reducer from '../../src/reducers/search';
import mockResults from '../../src/utils/mock-search-results';
describe('reducers', function () {
  describe('search', function () {
    it('should return the initial state', function (done) {
      const initialState = reducer(undefined, {});
      const expectedState = {
        items: [],
        bucketCount: 0,
        status: undefined,
        id: undefined,
        loading: true
      };
      expect(initialState).to.deep.equal(expectedState);
      done();
    });
    it('action RECEIVE_SEARCH_RESULT should add items to the state and set loading to false', function (done) {
      const initialState = reducer(undefined, {type: RECEIVE_SEARCH_RESULT, items: mockResults, loading: false});
      const expectedState = {
        items: mockResults,
        bucketCount: 0,
        status: undefined,
        id: undefined,
        loading: false
      };
      expect(initialState).to.deep.equal(expectedState);
      done();
    });
    it('action BUSY_SEARCHING should set loading to true', function (done) {
      const initialState = reducer(undefined, {type: BUSY_SEARCHING, loading: true});
      const expectedState = {
        items: [],
        bucketCount: 0,
        status: undefined,
        id: undefined,
        loading: true
      };
      expect(initialState).to.deep.equal(expectedState);
      done();
    });
  });
});

import { RECEIVE_SEARCH_RESULT, BUSY_SEARCHING, TAG_ADD_TAGS, TAG_REMOVE_TAG } from '../../src/constants/actionTypes';

import { expect } from 'chai';
import reducer from '../../src/reducers/search';
import mockResults from '../../src/utils/mock-search-results';

const expectedInitialState = {
  items: [],
  bucketCount: 0,
  status: undefined,
  id: undefined,
  loading: true,
  tags: [],
  filterVisibleState: {},
  tiles: [],
  addMessageVisible: false,
  searchString: ''
};

describe('reducers', function () {
  describe('search', function () {
    it('should return the initial state', function (done) {
      const initialState = reducer(undefined, {});
      const expectedState = {
        ...expectedInitialState,
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
        ...expectedInitialState,
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
        ...expectedInitialState,
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
  describe('tags', function () {
    it('should return the initial state', function (done) {
      const initialState = reducer(undefined, {});
      expect(initialState).to.deep.equal(expectedInitialState);
      done();
    });
    it('action TAG_ADD_TAGS should add tags to our state', function (done) {
      const initialState = reducer(undefined, {type: TAG_ADD_TAGS, tags: ['a', 'b', 'c']});
      const expectedState = {
        ...expectedInitialState,
        tags: ['a', 'b', 'c']
      };
      expect(initialState).to.deep.equal(expectedState);
      done();
    });
    it('action TAG_REMOVE_TAGS shoud remove a tag from our state', function (done) {
      const initialTags = [
        {
          tagName: 'this',
          colour: 'red'
        },
        {
          tagName: 'is',
          colour: 'green'
        },
        {
          tagName: 'sparta',
          colour: 'pink'
        }
      ];
      const state = reducer({...expectedInitialState, tags: initialTags}, {type: TAG_REMOVE_TAG, tagName: 'sparta'});
      const expectedState = {
        ...expectedInitialState,
        tags: [
          {
            tagName: 'this',
            colour: 'red'
          },
          {
            tagName: 'is',
            colour: 'green'
          }
        ]
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
  });
});

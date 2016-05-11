import {
  TAG_ADD_TAGS,
  TAG_REMOVE_TAG,
  TILES_ADD_TILES,
  TAG_ADD_SINGLE_TAG,
  FILTER_ON_CLICK
} from '../../src/constants/actionTypes';
import { expect } from 'chai';
import * as actions from '../../src/actions/tags';

import thunk from 'redux-thunk';
import configureMockStore from './test-helpers';
const mockStore = configureMockStore([thunk]);
const initialState = {
  search: {
    tags: [],
    items: []
  },
  travelInfo: {
    numberOfChildren: '0',
    numberOfAdults: '2',
    childAge1: '0 years',
    childAge2: '0 years',
    childAge3: '0 years',
    childAge4: '0 years',
    departureDate: '2020-04-04',
    duration: '2 weeks',
    departureAirport: 'Copenhagen - CPH'
  }
};

describe('actions', () => {
  describe('tags', () => {
    it('should create an action to add tags', (done) => {
      const tags = ['a', 'b', 'c'];
      const expectedAction = {
        type: TAG_ADD_TAGS,
        tags: tags
      };

      expect(actions.addTags(tags)).to.deep.equal(expectedAction);
      done();
    });
    it('should create an action to remove a tag', (done) => {
      const displayName = 'sparta';
      const expectedAction = {
        type: TAG_REMOVE_TAG,
        displayName
      };
      expect(actions.deleteTag(displayName)).to.deep.equal(expectedAction);
      done();
    });
  });
  describe('tiles', () => {
    it('should create an action to add tiles', (done) => {
      const tileArray = ['a', 'b', 'c'];
      const expectedAction = {
        type: TILES_ADD_TILES,
        tileArray: tileArray
      };
      expect(actions.addTiles(tileArray)).to.deep.equal(expectedAction);
      done();
    });
  });
  describe('addSingleTag', () => {
    it(`should create an action to add a single tag if the tag doesnt exist`, (done) => {
      const store = mockStore(initialState);
      const expectedAction = {
        type: TAG_ADD_SINGLE_TAG,
        tag: {
          displayName: 'test',
          colour: '#8EB8C4',
          id: 'test'
        }
      };
      store.dispatch(actions.addSingleTag('test', 'test'));
      expect(store.getActions()).to.deep.equal([expectedAction]);
      done();
    });
  });
  describe('onFilterClick', () => {
    it('should create an action to remove a filter once clicked', (done) => {
      const expectedAction = {
        type: FILTER_ON_CLICK,
        displayName: 'test'
      };
      expect(actions.onFilterClick('test')).to.deep.equal(expectedAction);
      done();
    });
  });
});

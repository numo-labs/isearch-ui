import {
  BUSY_SEARCHING,
  SAVE_SEARCH_RESULT_ID,
  RECEIVE_SEARCH_RESULT,
  SAVE_SOCKET_CONNECTION_ID,
  SAVE_BUCKET_ID,
  SEARCH_ERROR,
  UPDATE_HEADER_TITLES,
  CLEAR_FEED,
  UPDATE_DISPLAYED_ITEMS,
  SEARCH_COMPLETE
  // TILES_ADD_TILES,
} from '../../src/constants/actionTypes';
import moment from 'moment';

import { MUTATION_START_SEARCH } from '../../src/constants/mutations.js';

import { expect } from 'chai';
import simple from 'simple-mock';
import thunk from 'redux-thunk';

import * as actions from '../../src/actions/search-results';
import * as graphqlService from '../../src/services/graphql';

// import mockResults from '../../src/utils/mock-search-results';

// mock redux store
import configureMockStore from './test-helpers';
const mockStore = configureMockStore([thunk]);
const initialState = {
  search: {
    searchString: 'h',
    tags: [
      {id: 'geo:geonames:12345', displayName: 'spain'},
      {id: 'amenity:wifi', displayName: 'wifi'},
      {id: 'amenity:pool', displayName: 'pool'}
    ],
    items: [],
    ranking: {},
    bucketId: '1',
    resultId: '1',
    displayedItems: [],
    pageSize: 5
  },
  travelInfo: {
    numberOfChildren: '0',
    childAge1: '',
    childAge2: '',
    childAge3: '',
    childAge4: '',
    departureAirport: '',
    duration: '',
    departureDate: moment(),
    passengerBirthdays: [],
    numberOfChildrenTitle: '2',
    numberOfAdultsTitle: '2',
    durationTitle: '2 weeks'
  },
  bucketId: '12345'
};

describe('Search Results Actions', () => {
  afterEach(function (done) {
    simple.restore();
    done();
  });
  describe('search actions', () => {
    it(`startSearch: should dispatch an action to set loading to true and an
        action fetchQuerySearchResults if there are tags. Shoud also call
        an action to mark the search as complete after 4 seconds`, function (done) {
      this.timeout(6000);
      const json = {
        data: {
          viewer: {
            startSearch: {
              id: '12345'
            }
          }
        }
      };
      simple.mock(graphqlService, 'query').resolveWith(json);
      const store = mockStore(initialState);
      const expectedActions = [
        { type: BUSY_SEARCHING, isBusy: true },
        { type: CLEAR_FEED },
        { type: SAVE_SEARCH_RESULT_ID, id: '12345' },
        { type: SEARCH_COMPLETE }
      ];
      store.dispatch(actions.startSearch('testing test'));
      setTimeout(() => {
        graphqlService.query.lastCall.returned
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
            expect(graphqlService.query.calls[0].args[0]).to.equal(MUTATION_START_SEARCH);
            done();
          })
          .catch(done);
      }, 5000);
    });
    it(`startSearch: should dispatch an action to set the search error if no search id
      is returned`, function (done) {
      this.timeout(600);
      const json = {
        data: {
          viewer: {
            startSearch: {
              id: null
            }
          }
        }
      };
      simple.mock(graphqlService, 'query').resolveWith(json);
      const store = mockStore(initialState);
      const expectedAction = { type: SEARCH_ERROR, error: 'No results found' };
      store.dispatch(actions.startSearch());
      graphqlService.query.lastCall.returned
        .then(() => {
          expect(store.getActions()).to.contain(expectedAction);
          expect(graphqlService.query.calls[0].args[0]).to.equal(MUTATION_START_SEARCH);
          done();
        })
        .catch(done);
    });
    it(`recieveSearchResults should return an object with type
       RECEIVE_SEARCH_RESULT and items, append and initialSearch keys`, done => {
      const store = mockStore(initialState);
      const expectedActions = [
        {
          type: RECEIVE_SEARCH_RESULT,
          items: [{}],
          initialSearch: false,
          append: true
        }
      ];
      store.dispatch(actions.receiveSearchResult([{}], false, true));
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
    it(`recieveSearchResults should default append to false`, done => {
      const store = mockStore(initialState);
      const expectedActions = [
        {
          type: RECEIVE_SEARCH_RESULT,
          items: [{}],
          initialSearch: false,
          append: false
        }
      ];
      store.dispatch(actions.receiveSearchResult([{}], false));
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
  });
  describe('Inifinite Scroll actions', () => {
    it(`loadMoreItemsIntoFeed: dispatch updateDisplayedItems action with
      items if current 'displayedItems' state is less than initialPageSize and
      'items' state has items`, done => {
      const items = [
        {id: 'one', rank: 3},
        {id: 'two', rank: 2},
        {id: 'three', rank: 1}
      ];
      const store = mockStore({search: { displayedItems: [], items, pageSize: 5, initialPageSize: 10 }});
      const expectedActions = [{type: UPDATE_DISPLAYED_ITEMS, items}];
      store.dispatch(actions.loadMoreItemsIntoFeed());
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
    it(`loadMoreItemsIntoFeed: if items has more than "pageSize" items more than
      displayedItems then dispatch updateDisplayedItems action
      with a list of items including the next "pageSize" items`, done => {
      const items = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8},
        {id: 9},
        {id: 10}
      ];
      const store = mockStore({search: { displayedItems: items.slice(0, 2), items, pageSize: 5, initialPageSize: 0 }});
      const expectedAction = {type: UPDATE_DISPLAYED_ITEMS, items: items.slice(0, 7)};
      store.dispatch(actions.loadMoreItemsIntoFeed());
      expect(store.getActions()[0]).to.deep.equal(expectedAction);
      done();
    });
    it(`loadMoreItemsIntoFeed: if the length of items is less than the initialPageSize
      dispatch updateDisplayedItems with all the available items`, done => {
      const items = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7}
      ];
      const store = mockStore({search: { displayedItems: [], items, initialPageSize: 10, pageSize: 5 }});
      const expectedActions = [{type: UPDATE_DISPLAYED_ITEMS, items}];
      store.dispatch(actions.loadMoreItemsIntoFeed());
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
    it(`loadMoreItemsIntoFeed: if the number of displayedItems equals number of
      items then get "pageSize" items from the relatedItems store'`, done => {
      const items = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7}
      ];
      const relatedItems = [
        {id: 8},
        {id: 9},
        {id: 10},
        {id: 11},
        {id: 12},
        {id: 13},
        {id: 14}
      ];
      const store = mockStore({search: { displayedItems: items, items, relatedItems, pageSize: 5 }});
      store.dispatch(actions.loadMoreItemsIntoFeed());
      const expectedActions = [{
        type: UPDATE_DISPLAYED_ITEMS,
        items: items.concat(relatedItems.slice(0, 5))
      }];
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
    it(`loadMoreItemsIntoFeed: if displayedItems and items are both empty
      arrays then return'`, done => {
      const store = mockStore({search: { displayedItems: [], items: [] }});
      store.dispatch(actions.loadMoreItemsIntoFeed(1));
      expect(store.getActions()).to.deep.equal([]);
      done();
    });
  });
  describe('Web Socket connection actions', () => {
    it(`saveSocketConnectionId: should dispatch the action to save the
        search result id`, done => {
      const store = mockStore(initialState);
      const id = '12345';
      const expectedActions = [
        {
          type: SAVE_SOCKET_CONNECTION_ID,
          id
        }
      ];
      store.dispatch(actions.saveSocketConnectionId(id));
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
    it(`saveSearchResult: should dispatch an action resultId save the search results
        if the searchId of the data matches the bucketId`, done => {
      const result = {
        graphql: {
          id: '12345',
          searchId: '34567',
          items: [{}]
        }
      };

      const dispatch = simple.mock();
      const state = simple.mock().returnWith({ search: { resultId: '34567' } });
      actions.saveSearchResult(result)(dispatch, state);
      expect(dispatch.lastCall.arg).to.be.a('function');
      done();
    });
    it(`saveSearchResult: should ignore the data if the searchId of the data
        does not match the resultId`, done => {
      const result = {
        graphql: {
          id: '12345',
          searchId: '34567',
          items: [{}]
        }
      };
      const dispatch = simple.mock();
      const state = simple.mock().returnWith({ search: { resultId: '12345' } });
      actions.saveSearchResult(result)(dispatch, state);
      expect(dispatch.callCount).to.equal(0);
      done();
    });
  });
  describe('save Id actions', function () {
    it('saveBucketId: saves the search bucketId to the state as bucketId', function (done) {
      const store = mockStore(initialState);
      const expectedActions = [
        {
          type: SAVE_BUCKET_ID,
          id: '1'
        }
      ];
      store.dispatch(actions.saveBucketId('1'));
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
    it('saveSearchResultId: saves the searchResultId to the state as resultId', function (done) {
      const store = mockStore(initialState);
      const expectedActions = [
        {
          type: SAVE_SEARCH_RESULT_ID,
          id: '10'
        }
      ];
      store.dispatch(actions.saveSearchResultId('10'));
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
  });
  describe('header title update actions', function () {
    it('updateHeaderTitles: returns an object with type UPDATE_HEADER_TITLES', function (done) {
      const store = mockStore(initialState);
      const expectedActions = [
        { type: UPDATE_HEADER_TITLES }
      ];
      store.dispatch(actions.updateHeaderTitles());
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
  });
});

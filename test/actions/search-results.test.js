import {
  BUSY_SEARCHING,
  SAVE_SEARCH_RESULT_ID,
  RECEIVE_SEARCH_RESULT,
  SAVE_SOCKET_CONNECTION_ID,
  SAVE_BUCKET_ID
  // TILES_ADD_TILES,
  // SEARCH_ERROR
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
    bucketId: '1',
    resultId: '1',
    displayedItems: []
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
        action fetchQuerySearchResults if there are tags`, function (done) {
      this.timeout(10100);
      const json = {
        data: {
          viewer: {
            searchResultId: {
              id: '12345'
            }
          }
        }
      };
      simple.mock(graphqlService, 'query').resolveWith(json);
      const store = mockStore(initialState);
      const expectedActions = [
        { type: BUSY_SEARCHING, isBusy: true },
        { type: SAVE_SEARCH_RESULT_ID, id: '12345' },
        {
          'payload': {
            'args': [
              '/search/12345'
            ],
            'method': 'push'
          },
          'type': '@@router/CALL_HISTORY_METHOD'
        }
      ];
      store.dispatch(actions.startSearch());
      graphqlService.query.lastCall.returned
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          expect(graphqlService.query.calls[0].args[0]).to.equal(MUTATION_START_SEARCH);
          done();
        })
        .catch(done);
    });
  });
  it(`retrieveSearchResults should return an object with type
     RECEIVE_SEARCH_RESULT and items, append and initialSearch keys`, done => {
    const store = mockStore(initialState);
    const expectedActions = [
      {
        type: RECEIVE_SEARCH_RESULT,
        items: [{}],
        initialSearch: false,
        append: false
      }
    ];
    store.dispatch(actions.receiveSearchResult([{}], false, false));
    expect(store.getActions()).to.deep.equal(expectedActions);
    done();
  });
  it(`retrieveSearchResults should default append to false`, done => {
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

      const expectedAction = {
        type: RECEIVE_SEARCH_RESULT,
        items: [ {} ],
        initialSearch: false,
        append: false
      };
      const dispatch = simple.mock();
      const state = simple.mock().returnWith({ search: { resultId: '34567' } });
      actions.saveSearchResult(result)(dispatch, state);
      expect(dispatch.lastCall.arg).to.deep.equal(expectedAction);
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
});

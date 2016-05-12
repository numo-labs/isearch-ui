import {
  BUSY_SEARCHING,
  SAVE_SEARCH_RESULT_ID,
  RECEIVE_SEARCH_RESULT,
  // TILES_ADD_TILES,
  //SEARCH_ERROR
} from '../../src/constants/actionTypes';

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
    departureDate: '',
    passengerBirthdays: [],
    numberOfChildrenTitle: '2',
    numberOfAdultsTitle: '2',
    durationTitle: '2 weeks'
  }
};

describe('actions', function () {
  afterEach(function (done) {
    simple.restore();
    done();
  });
  describe('startSearch', function () {
    it('should dispatch an action to set loading to true and an action fetchQuerySearchResults if there are tags', function (done) {
      this.timeout(10100);
      const json = {
        data: {
          viewer: {
            searchResultId: {
              id: 12345
            }
          }
        }
      };
      simple.mock(graphqlService, 'query').resolveWith(json);
      const store = mockStore(initialState);
      const expectedActions = [
        { type: BUSY_SEARCHING, isBusy: true },
        { type: SAVE_SEARCH_RESULT_ID, id: 12345 }
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
  describe('fetchQuerySearchResults', function () {
    afterEach(function (done) {
      simple.restore();
      done();
    });
    const json = {
      data: {
        viewer: {
          searchResult: {
            items: [{
              type: 'packageOffer'
            }]
          }
        }
      }
    };

    // Does not happen anymore
    // it('no displayedItems -> should call the addTiles and receiveSearchResult actions with the items', function (done) {
    //   const expectedActions = [
    //     { type: 'TILES_ADD_TILES', tileArray: undefined },
    //     {
    //       type: 'RECEIVE_SEARCH_RESULT',
    //       items: [{
    //         type: 'packageOffer'
    //       }],
    //       initialSearch: true,
    //       append: true
    //     }
    //   ];
    //   var stub = simple.mock(graphqlService, 'query').resolveWith(json);
    //   const store = mockStore(initialState);
    //   store.dispatch(actions.fetchQuerySearchResults('1', 1, 2, 0))
    //     .then(() => {
    //       expect(store.getActions()).to.deep.equal(expectedActions);
    //       expect(stub.callCount).to.equal(1);
    //       done();
    //     })
    //     .catch(done);
    // });
    it('existing displayedItems -> should call only the receiveSearchResult action with the items', function (done) {
      const expectedActions = [
        {
          type: RECEIVE_SEARCH_RESULT,
          items: [{
            type: 'packageOffer'
          }],
          initialSearch: false,
          append: false
        }
      ];
      var stub = simple.mock(graphqlService, 'query').resolveWith(json);
      const initialStateWithResults = {
        ...initialState,
        search: {
          ...initialState.search,
          displayedItems: [{}]
        }
      };
      const store = mockStore(initialStateWithResults);
      store.dispatch(actions.fetchQuerySearchResults('1', 1, 2, 0))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          expect(stub.callCount).to.equal(1);
          done();
        })
        .catch(done);
    });
    // We are currently not displaying an error anymore
    // it('attempt > 15 -> should dispatch a search error', function (done) {
    //   simple.mock(graphqlService, 'query').resolveWith(json);
    //   const expectedActions = [
    //     {
    //       type: SEARCH_ERROR,
    //       error: 'Something went wrong and no results were found'
    //     }
    //   ];
    //   const store = mockStore(initialState);
    //   store.dispatch(actions.fetchQuerySearchResults('1', 1, 2, 16))
    //     .then(() => {
    //       console.log('actions', store.getActions());
    //       expect(store.getActions()).to.deep.equal(expectedActions);
    //       done();
    //     })
    //     .catch(done);
    // });
    it('no items returned from graphql -> should poll for more results', function (done) {
      this.timeout(10100);
      const noItems = {data: { viewer: { searchResult: { items: [] } } }};
      simple.mock(graphqlService, 'query')
        .resolveWith(noItems);
      const store = mockStore(initialState);
      const stub = simple.mock(store, 'dispatch').callOriginal();
      store.dispatch(actions.fetchQuerySearchResults('1', 1, 2, 1));

      graphqlService.query.lastCall.returned
        .then(json => {
          expect(json).to.equal(noItems);
          setTimeout(function () {
            expect(stub.lastCall.arg.name).to.equal('fetchQuerySearchResults_anonymousFn');
            expect(graphqlService.query.callCount).to.equal(10); // exits after the 10th attempt (starts at 1)
            done();
          }, 10000);
        })
       .catch(done);
    });
  });
});

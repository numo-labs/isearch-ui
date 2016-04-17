import {
  // BUSY_SEARCHING,
  // SAVE_SEARCH_RESULT_ID,
  RECEIVE_SEARCH_RESULT,
  // TILES_ADD_TILES,
  SEARCH_ERROR
} from '../../src/constants/actionTypes';

import { expect } from 'chai';
import simple from 'simple-mock';
import thunk from 'redux-thunk';

import * as actions from '../../src/actions/search-results';
import * as graphqlService from '../../src/services/graphql';

// import mockResults from '../../src/utils/mock-search-results';

// mock redux store
import configureMockStore from './test-helpers';
const mockStore = configureMockStore([thunk]);
const initialState = {search: { searchString: 'h', tags: [], displayedItems: [] }};

describe('actions', function () {
  afterEach(function (done) {
    simple.restore();
    done();
  });
  // describe('startSearch', function () {
  //   it.only('should dispatch an action to set loading to true', function (done) {
  //     this.timeout(30000);
  //     const expectedActions = [
  //       { type: 'BUSY_SEARCHING' },
  //       { type: 'SAVE_SEARCH_RESULT_ID', id: null }
  //     ];
  //     const store = mockStore(initialState);
  //
  //     simple.mock(graphqlService, 'query');
  //     const actionStub = simple.mock(actions, 'fetchQuerySearchResults').returnWith({type: 'ADD_TILES'});
  //     store.dispatch(actions.startSearch())
  //       .then(() => {
  //         console.log(actionStub);
  //         expect(store.getActions()).to.deep.equal(expectedActions);
  //         expect(actionStub.callCount).to.equal(1);
  //         done();
  //       })
  //   });
  //   it('should dispatch an action fetchQuerySearchResults when graphql returns a json object', function (done) {
  //     // GIVEN
  //     const json = {
  //       data: {
  //         viewer: {
  //           searchResultId: {
  //             id: 12345
  //           }
  //         }
  //       }
  //     };
  //     simple.mock(graphqlService, 'query');
  //     graphqlService.query.resolveWith(json);
  //     const expectedActions = [
  //       { type: BUSY_SEARCHING, loading: true },
  //       { type: SAVE_SEARCH_RESULT_ID, id: 12345 }
  //     ];
  //     const store = mockStore(initialState);
  //     store.dispatch(actions.startSearch())
  //       .then(() => {
  //         expect(store.getActions()).to.deep.equal(expectedActions);
  //         done();
  //       })
  //   });
  // });
  describe('fetchQuerySearchResults', function () {
    const json = {
      data: {
        viewer: {
          searchResult: {
            items: [{}]
          }
        }
      }
    };
    it('no displayedItems -> should call the addTiles and receiveSearchResult actions with the items', function (done) {
      const expectedActions = [
        { type: 'TILES_ADD_TILES', tileArray: undefined },
        {
          type: 'RECEIVE_SEARCH_RESULT',
          items: [{}],
          initialSearch: true
        }
      ];
      var stub = simple.mock(graphqlService, 'query').resolveWith(json);
      const store = mockStore(initialState);
      store.dispatch(actions.fetchQuerySearchResults('1', 1, 2, 0))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          expect(stub.callCount).to.equal(1);
          done();
        })
        .catch(done);
    });
    it('existing displayedItems -> should call only the receiveSearchResult action with the items', function (done) {
      const expectedActions = [
        {
          type: RECEIVE_SEARCH_RESULT,
          items: [{}],
          initialSearch: false
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
          console.log('actions', store.getActions());
          expect(store.getActions()).to.deep.equal(expectedActions);
          expect(stub.callCount).to.equal(1);
          done();
        })
        .catch(done);
    });
    it('attempt > 9 -> should dispatch a search error', function (done) {
      simple.mock(graphqlService, 'query').resolveWith(json);
      const expectedActions = [
        {
          type: SEARCH_ERROR,
          error: 'Something went wrong and no results were found'
        }
      ];
      const store = mockStore(initialState);
      store.dispatch(actions.fetchQuerySearchResults('1', 1, 2, 10))
        .then(() => {
          console.log('actions', store.getActions());
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        })
        .catch(done);
    });
  });
  // describe('filterResults', () => {
  //   it('filters the items array for the results that match the selected tags', (done) => {
  //     const expectedActions = [
  //       { type: types. }
  //     ]
  //   })
  // })
});

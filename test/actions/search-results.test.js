import {
  BUSY_SEARCHING,
  SAVE_SEARCH_RESULT_ID,
  RECEIVE_SEARCH_RESULT,
  TILES_ADD_TILES,
  SEARCH_ERROR
} from '../../src/constants/actionTypes';
import { expect } from 'chai';
import * as actions from '../../src/actions/search-results';
import simple from 'simple-mock';
import * as graphqlService from '../../src/services/graphql';
import mockResults from '../../src/utils/mock-search-results';
import configureMockStore from './test-helpers';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const initialState = {search: { searchString: 'h', tags: [], displayedItems: [] }};

describe('actions', function () {
  afterEach(function (done) {
    simple.restore();
    done();
  });
  describe('search results', function () {
    describe('startSearch', function () {
      it('should dispatch an action to set loading to true', function (done) {
        const expectedActions = [ { type: BUSY_SEARCHING } ];
        const store = mockStore(initialState);

        simple.mock(graphqlService, 'query');
        store.dispatch(actions.startSearch())
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
            done();
          })
      });
      it('should dispatch an action fetchQuerySearchResults when graphql returns a json object', function (done) {
        // GIVEN
        const json = {
          data: {
            viewer: {
              searchResultId: {
                id: 12345
              }
            }
          }
        };
        simple.mock(graphqlService, 'query');
        graphqlService.query.resolveWith(json);
        const expectedActions = [
          { type: BUSY_SEARCHING, loading: true },
          { type: SAVE_SEARCH_RESULT_ID, id: 12345 }
        ];
        const store = mockStore(initialState);
        store.dispatch(actions.startSearch())
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
            done();
          })
      });
    });
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
        const dispatch = simple.mock();
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
          .catch(done)
      });
      it('existing displayedItems -> should call only the receiveSearchResult action with the items', function (done) {
        const dispatch = simple.mock();
        const expectedActions = [
          {
            type: RECEIVE_SEARCH_RESULT,
            items: [{}],
            initialSearch: false
          }
        ];
        var stub = simple.mock(graphqlService, 'query').resolveWith(json);
        const store = mockStore({...initialState, search: {...initialState.search, displayedItems: [{}]}});
        store.dispatch(actions.fetchQuerySearchResults('1', 1, 2, 0))
          .then(() => {
            console.log('actions', store.getActions());
            expect(store.getActions()).to.deep.equal(expectedActions);
            expect(stub.callCount).to.equal(1);
            done();
          })
          .catch(done)
      });
      it.only('attempt > 9 -> should dispatch a search error', function (done) {
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
          .catch(done)
      });
    });
  });
});

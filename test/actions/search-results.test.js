import { BUSY_SEARCHING, SAVE_SEARCH_RESULT_ID } from '../../src/constants/actionTypes';
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
        // consts
        const expectedActions = [ { type: BUSY_SEARCHING } ];
        const store = mockStore(initialState);

        simple.mock(graphqlService, 'query');
        store.dispatch(actions.startSearch())
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          })
          .then(done());
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
          })
          .then(done());
      });
    });
    describe('fetchQuerySearchResults', function () {
      it('should dispatch an action fetchQuerySearchResults if no items have been returned from the graphql query', function (done) {
        // GIVEN
        const dispatch = simple.mock();
        const json = {
          data: {
            viewer: {
              searchResult: {
                items: []
              }
            }
          }
        };
        simple.mock(graphqlService, 'query');
        graphqlService.query.resolveWith(json);
        // WHEN
        actions.fetchQuerySearchResults()(dispatch);
        // THEN
        graphqlService.query.lastCall.returned.then(json => {
          expect(dispatch.lastCall.arg.name).to.equal('fetchQuerySearchResults');
        });
        done();
      });
      it('should dispatch an action receiveSearchResult if items have been returned from the graphql query', function (done) {
        // GIVEN
        const dispatch = simple.mock();
        const json = mockResults;
        simple.mock(graphqlService, 'query');
        graphqlService.query.resolveWith(json);
        // WHEN
        actions.fetchQuerySearchResults()(dispatch);
        // THEN
        graphqlService.query.lastCall.returned.then(json => {
          expect(dispatch.lastCall.arg.name).to.equal('receiveSearchResult');
        });
        done();
      });
    });
  });
});

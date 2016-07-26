'use strict';

import { QUERY_AUTOCOMPLETE_INPUT } from '../../src/constants/queries.js';
import {
  SET_AUTOCOMPLETE_OPTIONS,
  SET_AUTOCOMPLETE_ERROR,
  SET_AUTOCOMPLETE_IN_SEARCH
} from '../../src/constants/actionTypes';
import { expect } from 'chai';
import simple from 'simple-mock';
import thunk from 'redux-thunk';

import * as actions from '../../src/actions/autocomplete.js';
import * as graphqlService from '../../src/services/graphql';

// mock redux store
import configureMockStore from './test-helpers';
const mockStore = configureMockStore([thunk]);

describe('Autocomplete actions', () => {
  it(`getAutocompleteOptions launches clearSearchString if there is a empty searchString`, (done) => {
    const expectedActions = [{ type: 'CLEAR_SEARCH_STRING' }];
    const store = mockStore({search: { searchString: '' }});
    store.dispatch(actions.getAutocompleteOptions());
    expect(store.getActions()).to.deep.equal(expectedActions);
    done();
  });
  it(`getAutocompleteOptions launches a graphql autocomplete query when the
      searchString value is greater than 0 and sets the results`, (done) => {
    const json = {
      data: {
        viewer: {
          autocomplete: {
            items: [{
              'name': 'Spanien',
              'tagid': 'geo:geonames.2510769',
              'label': 'Spanien',
              'boost': 1,
              'active': true
            }]
          }
        }
      }
    };
    const expectedActions = [
      { type: SET_AUTOCOMPLETE_IN_SEARCH },
      {
        type: SET_AUTOCOMPLETE_OPTIONS,
        items: [{
          'name': 'Spanien',
          'tagid': 'geo:geonames.2510769',
          'label': 'Spanien',
          'boost': 1,
          'active': true
        }]
      }
    ];
    const store = mockStore({search: { searchString: 'spa' }});
    var stub = simple.mock(graphqlService, 'query').resolveWith(json);
    store.dispatch(actions.getAutocompleteOptions());
    graphqlService.query.lastCall.returned
      .then(json => {
        console.log('actions', store.getActions());
        expect(store.getActions()).to.deep.equal(expectedActions);
        expect(graphqlService.query.calls[0].args[0]).to.equal(QUERY_AUTOCOMPLETE_INPUT);
        expect(stub.callCount).to.equal(1);
        done();
      })
      .catch(done);
  });
  it(`getAutocompleteOptions launches a graphql autocomplete query when the
      searchString value is greater than 0 and set an error if no items
      returned`, (done) => {
    const json = {
      data: {
        viewer: {
          autocomplete: {
            items: null
          }
        }
      }
    };
    const expectedActions = [
      { type: SET_AUTOCOMPLETE_IN_SEARCH },
      {
        type: SET_AUTOCOMPLETE_ERROR,
        error: 'No matches found'
      }
    ];
    const store = mockStore({search: { searchString: 's' }});
    var stub = simple.mock(graphqlService, 'query').resolveWith(json);
    store.dispatch(actions.getAutocompleteOptions());
    graphqlService.query.lastCall.returned
      .then(json => {
        console.log('actions', store.getActions());
        expect(store.getActions()).to.deep.equal(expectedActions);
        expect(graphqlService.query.calls[0].args[0]).to.equal(QUERY_AUTOCOMPLETE_INPUT);
        expect(stub.callCount).to.equal(1);
        done();
      })
      .catch(done);
  });
  it('setAutocompleteOptions: dispatches an action with items', function (done) {
    const items = [{
      'name': 'Spanien',
      'tagid': 'geo:geonames.2510769',
      'label': 'Spanien',
      'boost': 1,
      'active': true
    }];
    const expectedAction = {
      type: SET_AUTOCOMPLETE_OPTIONS,
      items
    };
    expect(actions.setAutocompleteOptions(items)).to.deep.equal(expectedAction);
    done();
  });
  it('setAutocompleteError: dispatches an action with error', function (done) {
    const error = 'No matches found';
    const expectedAction = {
      type: SET_AUTOCOMPLETE_ERROR,
      error
    };
    expect(actions.setAutocompleteError(error)).to.deep.equal(expectedAction);
    done();
  });
  it(`setAutocompleteInSearch: dispatches an action to set inAutocompleteSearch
      to true`, function (done) {
    const expectedAction = { type: SET_AUTOCOMPLETE_IN_SEARCH };
    expect(actions.setAutocompleteInSearch()).to.deep.equal(expectedAction);
    done();
  });
});

import { initialise } from '../../src/services/websockets.js';
import { expect } from 'chai';
import thunk from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { TAG_ADD_SINGLE_TAG, SAVE_SOCKET_CONNECTION_ID, RECEIVE_SEARCH_RESULT } from '../../src/constants/actionTypes';
// mock redux store
import configureMockStore from '../actions/test-helpers';
const mockStore = configureMockStore([thunk]);

describe('Web Socket Service', function () {
  it('if there is a connection id in the data, calls the saveSocketConnectionId and addSingleTag actions', done => {
    const store = mockStore({search: { tags: [], resultId: '1234' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder);
    primus.on('data', data => {
      let expectedActions = [
        {
          type: SAVE_SOCKET_CONNECTION_ID,
          id: data.connection
        },
        {
          type: TAG_ADD_SINGLE_TAG,
          tag: {
            displayName: 'Top inspiration',
            colour: '#8EB8C4',
            id: 'marketing:homepage.dk.spies'
          },
          isInitialTag: true
        }
      ];
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
    primus.emit('data', {
      connection: 'abc123'
    });
  });
  it('if there are search results in the data, saves the search results', done => {
    const store = mockStore({search: { tags: [], resultId: 'abc123' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder);
    primus.on('data', data => {
      let expectedActions = [
        {
          type: RECEIVE_SEARCH_RESULT,
          items: [{ name: 'test' }],
          initialSearch: false,
          append: false
        }
      ];
      expect(store.getActions().slice(-1)).to.deep.equal(expectedActions);
      done();
    });
    primus.emit('data', {
      graphql: {
        searchId: 'abc123',
        items: [{
          name: 'test'
        }]
      }
    });
  });
});

import { initialise } from '../../src/services/websockets.js';
import { expect } from 'chai';
import thunk from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { TAG_ADD_SINGLE_TAG, SAVE_SOCKET_CONNECTION_ID, RECEIVE_SEARCH_RESULT } from '../../src/constants/actionTypes';
import Primus from '../../src/services/primus.js';
// mock redux store
import configureMockStore from '../actions/test-helpers';
const mockStore = configureMockStore([thunk]);
const request = require('request');
const socketUrl = 'http://eb-ci.wmm63vqska.eu-west-1.elasticbeanstalk.com';

describe('Web Socket Service', () => {
  it('initialise - if there is a connection id in the data, calls the saveSocketConnectionId and addSingleTag actions', done => {
    global.primus = new Primus(socketUrl);
    const store = mockStore({search: { tags: [], resultId: '1234' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    initialise(actionCreatorBinder);
    let counter = 0;
    let expectedActions = [];
    primus.on('data', data => {
      if (counter === 0) {
        postDataToClient(data.connection);
      }
      if (data.connection) {
        expectedActions = [
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
      }
      ++counter;
      if (counter === 3) {
        expectedActions = expectedActions.concat([
          {
            type: RECEIVE_SEARCH_RESULT,
            items: [],
            initialSearch: false,
            append: false
          }
        ]);
        expect(store.getActions()).to.deep.equal(expectedActions);
        done();
      }
    });
  });
});

function postDataToClient (id) {
  request({
    method: 'post',
    url: socketUrl + '/data',
    body: {
      id,
      searchId: '1234',
      items: []
    },
    json: true
  }, function (err, res, body) {
    if (err) return console.error(err);
    if (body && body.errors) {
      process.stderr.write(JSON.stringify(body.errors, null, 2));
      process.exit(1);
    } else if (body) {
      process.stdout.write(JSON.stringify(body, null, 2));
    }
  });
}

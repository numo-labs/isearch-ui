import { initialise } from '../../src/services/websockets.js';
import { expect } from 'chai';
import thunk from 'redux-thunk';
import simple from 'simple-mock';
import { bindActionCreators } from 'redux';
import { TAG_ADD_SINGLE_TAG, SAVE_SOCKET_CONNECTION_ID, RECEIVE_SEARCH_RESULT } from '../../src/constants/actionTypes';
// mock redux store
import configureMockStore from '../actions/test-helpers';
const mockStore = configureMockStore([thunk]);

describe('Web Socket Service', function () {
  it('calls the saveSocketConnectionId and addSingleTag actions when connection is opened', () => {
    const store = mockStore({search: { tags: [], resultId: '1234' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder);
    primus.id = (cb) => { cb('abc123'); };
    primus.emit('open');
    let expectedActions = [
      {
        type: SAVE_SOCKET_CONNECTION_ID,
        id: 'abc123'
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
  });
  it('only calls the saveSocketConnectionId and addSingleTag actions on first connection', () => {
    const store = mockStore({search: { tags: [], resultId: '1234' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder);
    primus.id = (cb) => { cb('abc123'); };
    primus.emit('open');
    primus.emit('open');
    primus.emit('open');
    let expectedActions = [
      {
        type: SAVE_SOCKET_CONNECTION_ID,
        id: 'abc123'
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
  });
  it('subscribes to a primus room on connection', () => {
    const store = mockStore({search: { tags: [], resultId: '1234' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder);
    simple.mock(primus, 'write');
    primus.id = (cb) => { cb('abc123'); };
    primus.emit('open');
    expect(primus.write.callCount).to.equal(1);
    expect(primus.write.lastCall.args[0]).to.deep.equal({ action: 'join', room: 'abc123' });
  });
  it('subscribes to the original primus room on reconnection', () => {
    const store = mockStore({search: { tags: [], resultId: '1234' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder);
    simple.mock(primus, 'write');
    primus.id = (cb) => { cb('abc123'); };
    primus.emit('open');
    expect(primus.write.callCount).to.equal(1);
    expect(primus.write.lastCall.args[0]).to.deep.equal({ action: 'join', room: 'abc123' });
    primus.id = (cb) => { cb('def456'); };
    primus.emit('reconnected');
    expect(primus.write.callCount).to.equal(2);
    expect(primus.write.lastCall.args[0]).to.deep.equal({ action: 'join', room: 'abc123' });
  });
  it('if there are search results in the data, saves the search results', done => {
    const store = mockStore({search: { tags: [], resultId: 'abc123' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder);
    primus.once('data', data => {
      let expectedActions = [
        {
          type: RECEIVE_SEARCH_RESULT,
          items: [{ name: 'test', packageOffer: {} }],
          initialSearch: false,
          append: false
        }
      ];
      process.nextTick(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
        done();
      });
    });
    primus.emit('data', {
      graphql: {
        searchId: 'abc123',
        items: [{
          name: 'test',
          packageOffer: {}
        }]
      }
    });
  });
  it('should interlace packages and tiles.', done => {
    const store = mockStore({search: { tags: [], resultId: 'abc123' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder);
    let count = 0;
    primus.on('data', data => {
      if (count++ < 10) {
        return;
      }
      primus.removeAllListeners();

      // Find all of the action types that are tiles or packages.
      let items = store.getActions().map(
          i => i.items ? i.items.map(
            j => j.tile ? 'tile' : 'package'
          ) : []
        );
      // flatten array
      items = items.reduce((a, b) => a.concat(b), []);

      expect(items).to.deep.equal([
        'package',
        'package',
        'package',
        'tile',
        'package',
        'package',
        'package',
        'package',
        'package',
        'package',
        'tile',
        'package'
      ]);
      done();
    });
    primus.emit('data', {
      graphql: {
        searchId: 'abc123',
        items: [
          { name: 'test',
            tile: {}
          },
          { name: 'test',
            tile: {}
          },
          { name: 'test',
            tile: {}
          }
        ]
      }
    });
    for (let i = 0; i < 10; i++) {
      primus.emit('data', {
        graphql: {
          searchId: 'abc123',
          items: [{
            name: 'test',
            packageOffer: {}
          }]
        }
      });
    }
  });
});

import { initialise } from '../../src/services/websockets.js';
import { expect } from 'chai';
import thunk from 'redux-thunk';
import simple from 'simple-mock';
import { bindActionCreators } from 'redux';
import { SAVE_SOCKET_CONNECTION_ID, RESET_TAGS } from '../../src/constants/actionTypes';
import querystring from '../../src/utils/querystring';
import * as tagActions from '../../src/actions/tags';
// mock redux store
import configureMockStore from '../actions/test-helpers';
const mockStore = configureMockStore([thunk]);

describe('Web Socket Service', function () {
  afterEach(() => {
    simple.restore();
  });
  it('calls the saveSocketConnectionId action when connection is opened', () => {
    const store = mockStore({search: { tags: [], resultId: '1234' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder, 'search');
    primus.id = (cb) => { cb('abc123'); };
    primus.emit('open');
    let expectedActions = [
      {
        type: SAVE_SOCKET_CONNECTION_ID,
        id: 'abc123'
      },
      { type: RESET_TAGS }
    ];
    expect(store.getActions()).to.deep.equal(expectedActions);
  });
  it('calls the saveSocketConnectionId action when connection is opened but only calls resetTags if on the home page', () => {
    const store = mockStore({search: { tags: [], resultId: '1234' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder, 'hotel');
    primus.id = (cb) => { cb('abc123'); };
    primus.emit('open');
    let expectedActions = [
      {
        type: SAVE_SOCKET_CONNECTION_ID,
        id: 'abc123'
      }
    ];
    expect(store.getActions()).to.deep.equal(expectedActions);
  });
  it('performs an autocomplete lookup for a default tag if a query string search parameter is provided', () => {
    simple.mock(querystring, 'parse').returnWith({ search: 'family' });
    simple.mock(tagActions, 'searchForTag');
    const store = mockStore({search: { tags: [], resultId: '1234' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder, 'search');
    primus.id = (cb) => { cb('abc123'); };
    primus.emit('open');
    expect(store.getActions()).not.to.contain({ type: RESET_TAGS });
    expect(tagActions.searchForTag.called).to.be.true;
    expect(tagActions.searchForTag.lastCall.args[0]).to.equal('family');
  });
  it('only calls the saveSocketConnectionId action on first connection', () => {
    const store = mockStore({search: { tags: [], resultId: '1234' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder, 'search');
    primus.id = (cb) => { cb('abc123'); };
    primus.emit('open');
    primus.emit('open');
    primus.emit('open');
    let expectedActions = [
      {
        type: SAVE_SOCKET_CONNECTION_ID,
        id: 'abc123'
      },
      { type: RESET_TAGS }
    ];
    expect(store.getActions()).to.deep.equal(expectedActions);
  });
  it('subscribes to a primus room on connection', () => {
    const store = mockStore({search: { tags: [], resultId: '1234' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder, 'search');
    simple.mock(primus, 'write');
    primus.id = (cb) => { cb('abc123'); };
    primus.emit('open');
    expect(primus.write.callCount).to.equal(1);
    expect(primus.write.lastCall.args[0]).to.deep.equal({ action: 'join', room: 'abc123' });
  });
  it('subscribes to the original primus room on reconnection', () => {
    const store = mockStore({search: { tags: [], resultId: '1234' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder, 'search');
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
  it('if there are search results in the data, saves the search results by buffering', done => {
    const store = mockStore({search: { tags: [], resultId: 'abc123' }});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    const primus = initialise(actionCreatorBinder, 'search');
    primus.once('data', data => {
      process.nextTick(() => {
        expect(store.getActions()).to.deep.equal([]);
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
    const primus = initialise(actionCreatorBinder, 'search');
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

      expect(items).to.contain('tile');
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

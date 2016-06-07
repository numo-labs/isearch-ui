import * as SearchResultActions from '../actions/search-results.js';
import * as TagActions from '../actions/tags.js';
import Primus from '../../src/services/primus.js';

// TODO: Switch URL's based on the deployed environment. Maybe by using
// process.env and the setup within the webpack.config?
const socketUrl = 'https://ci-socket-server.tcdl.io?auto_room=false';
/**
* Function that initialises a connection with the web socket server and saves
* the id to the redux store
* It also initialises the event listeners for data, reconnected and error events
* transmitted from the web socket channel
* @param {Function} - actionCreatorBinder - function that takes an action
* and binds it to dispatch
*/

export function initialise (actionCreatorBinder, location) {
  const primus = new Primus(socketUrl);
  const {
    saveSearchResult,
    saveSocketConnectionId,
    resetTags
  } = actionCreatorBinder({...SearchResultActions, ...TagActions});
  primus.on('data', function received (data) {
    // console.log('incoming socket data', data);
    if (data.graphql) {
      saveSearchResult(data);
    }
  });

  primus.once('open', (data) => {
    primus.id((id) => {
      saveSocketConnectionId(id);
      join(id);
      primus.on('reconnected', () => { join(id); });
      // only launch the home page query after the socket connection has been
      // initialised
      var isHomePage = (location && location.indexOf('search'));
      if (isHomePage && isHomePage > 0) resetTags();
    });
  });

  primus.on('error', function error (err) {
    console.error('Something horrible has happened', err.stack);
  });

  function join (room) {
    primus.write({
      action: 'join',
      room: room
    });
  }

  return primus;
}

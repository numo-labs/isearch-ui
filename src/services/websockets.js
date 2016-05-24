import * as SearchResultActions from '../actions/search-results.js';
import * as TagActions from '../actions/tags.js';
/**
* Function that initialises a connection with the web socket server and saves
* the id to the redux store
* It also initialises the event listeners for data, reconnected and error events
* transmitted from the web socket channel
* @param {Function} - actionCreatorBinder - function that takes an action
* and binds it to dispatch
*/

export function initialise (actionCreatorBinder) {
  const {
    saveSearchResult,
    saveSocketConnectionId,
    addSingleTag
  } = actionCreatorBinder({...SearchResultActions, ...TagActions});

  primus.on('data', function received (data) {
    console.log('incoming socket data', data);
    if (data.connection) {
      saveSocketConnectionId(data.connection);
      // only launch the home page query after the socket connection has been
      // initialised
      addSingleTag('Top inspiration', 'marketing:homepage.dk.spies', true);
    } else if (data.graphql) {
      console.log('saving data');
      saveSearchResult(data);
    } else {
      return;
    }
  });

  primus.on('error', function error (err) {
    console.error('Something horrible has happened', err.stack);
  });

  primus.on('reconnected', function reconnected (opts) {
    primus.id(function (id) {
      saveSocketConnectionId(id);
    });
  });
}

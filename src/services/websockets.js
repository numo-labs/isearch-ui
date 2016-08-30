import * as SearchResultActions from '../actions/search-results.js';
import * as TagActions from '../actions/tags.js';
import querystring from '../utils/querystring';

import connect from '../utils/websockets';

/**
* Function that initialises a connection with the web socket server and saves
* the id to the redux store
* It also initialises the event listeners for data, reconnected and error events
* transmitted from the web socket channel
* @param {Function} - actionCreatorBinder - function that takes an action
* and binds it to dispatch
*/

export function initialise (actionCreatorBinder, location) {
  const primus = connect();
  const {
    saveSearchResult,
    saveSocketConnectionId,
    resetTags,
    searchForTag,
    registerProvider,
    updateTileRanking
  } = actionCreatorBinder({...SearchResultActions, ...TagActions});
  primus.on('data', function received (data) {
    // console.log('incoming socket data', data);
    if (data.graphql) {
      if (data.graphql.provider) {
        registerProvider(data);
      }
      if (data.graphql.items && data.graphql.items.length > 0) {
        saveSearchResult(data);
      } else if (data.graphql.ranking) {
        updateTileRanking(data);
      }
    }
  });

  primus.once('open', (data) => {
    primus.id((id) => {
      saveSocketConnectionId(id);
      join(id);
      primus.on('reconnected', () => { join(id); });
      // only launch the home page query after the socket connection has been
      // initialised
      var hotelPage = location.indexOf('hotel') > -1;
      var articlePage = location.indexOf('article') > -1;
      var isHomePage = (!hotelPage && !articlePage);
      if (isHomePage) {
        const query = querystring.parse();
        if (query.search) {
          return searchForTag(query.search);
        } else {
          return resetTags();
        }
      }
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

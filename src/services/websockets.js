import * as SearchResultActions from '../actions/search-results.js';

export function initialise (actionCreatorBinder) {
  const {
    saveSearchResult,
    saveSocketConnectionId
  } = actionCreatorBinder(SearchResultActions);

  primus.on('data', function received (data) {
    if (data.connection) {
      saveSocketConnectionId(data.connection);
    } else {
      saveSearchResult(data);
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

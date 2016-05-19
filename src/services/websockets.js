import * as SearchResultActions from '../actions/search-results.js';

export function initialise (actionCreatorBinder) {
  const {
    saveSearchResult
  } = actionCreatorBinder(SearchResultActions);

  primus.on('data', function received (data) {
    console.log('web socket data', JSON.stringify(data));
    saveSearchResult(data);
  });
}

// need to add more actions to handler connection, disconnection, etc

import { QUERY_FETCH_SEARCH_RESULT } from '../constants/queries';
import { MUTATION_START_SEARCH } from '../constants/mutations';
import { RECEIVE_SEARCH_RESULT, BUSY_SEARCHING } from '../constants/actionTypes';
import * as graphqlService from '../services/graphql';

export function fetchQuerySearchResults (id, page, size) {
  const fetchQuerySearchResults_anonymousFn = function (dispatch, getState) {
    return graphqlService(QUERY_FETCH_SEARCH_RESULT, {'id': id, 'page': page, 'size': size})
    .then(json => {
      const items = json.data.viewer.searchResult.items;
      console.log(items);
      if (!items || !items.length) {
        setTimeout(function () {
          console.log('Retrying');
          dispatch(fetchQuerySearchResults(id, page, size));
        }, 1000);
      } else {
        dispatch(receiveSearchResult(items));
      }
    });
  };
  return fetchQuerySearchResults_anonymousFn;
}

export function receiveSearchResult (items) {
  return {
    type: RECEIVE_SEARCH_RESULT,
    items,
    loading: false
  };
}

export function busySearching () {
  return {
    type: BUSY_SEARCHING,
    loading: true
  };
}

export function startSearch (query) {
  const fetchQuerySearchResults_anonymousFn = function (dispatch, getState) {
    dispatch(busySearching());
    return graphqlService.query(MUTATION_START_SEARCH, { 'query': JSON.stringify(query)})
    .then(json => {
      console.log(json);
      console.log('Looking for id:', json.data.viewer.searchResultId.id);
      dispatch(fetchQuerySearchResults(json.data.viewer.searchResultId.id, 1, 20));
    });
  };
  return fetchQuerySearchResults_anonymousFn;
}

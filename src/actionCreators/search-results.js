import { QUERY_FETCH_SEARCH_RESULT } from '../constants/queries';
import { MUTATION_START_SEARCH } from '../constants/mutations';
import { RECEIVE_SEARCH_RESULT, START_SEARCH, BUSY_SEARCHING } from '../constants/actionTypes';
import graphqlService from '../services/graphql';

export function fetchQuerySearchResults (id, page, size) {
  const fetchQuerySearchResults_anonymousFn = function (dispatch, getState) {
    return graphqlService(QUERY_FETCH_SEARCH_RESULT, {'id': id, 'page': page, 'size': size})
    .then(json => {
      const items = json.data.viewer.searchResult.items;
      dispatch(receiveSearchResult(items));
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
  }
}

export function startSearch () {
  const fetchQuerySearchResults_anonymousFn = function (dispatch, getState) {
    return graphqlService(MUTATION_START_SEARCH, {
      passengers: [
        {
          birthday: "1986-07-14"
        },
        {
          birthday: "1986-07-14"
        }
      ]
    })
    .then(json => {
      dispatch(fetchQuerySearchResults(json.data.viewer.searchResultId.id, 1, 20));
    });
  };
  return fetchQuerySearchResults_anonymousFn;
}

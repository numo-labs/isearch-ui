import { QUERY_FETCH_SEARCH_RESULT } from '../constants/queries';
import { RECEIVE_SEARCH_RESULT, START_SEARCH } from '../constants/actionTypes';
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

export function startSearch () {
  return {
    type: START_SEARCH,
    loading: true
  };
}

import { QUERY_FETCH_SEARCH_RESULT } from '../constants/queries';
import { RECEIVE_SEARCH_RESULT } from '../constants/actionTypes';
import graphqlService from '../services/graphql';
console.log(graphqlService);
export function fetchQuerySearchResults (id, page, size, isInitial) {
  const fetchQuerySearchResults_anonymousFn = function (dispatch, getState) {
    return graphqlService.query(QUERY_FETCH_SEARCH_RESULT, {'id': id, 'page': page, 'size': size})
    .then(json => {
      const items = json.data.viewer.searchResult.items;
      const isSealed = json.data.viewer.searchResult.metadata.isSealed;
      console.log(items.length);
      console.log(isSealed);
      if (!items.length) {
        setTimeout(() => {
          dispatch(fetchQuerySearchResults(id, page, size, isInitial));
        }, 100);
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
    items
  };
}

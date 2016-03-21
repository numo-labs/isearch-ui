import { QUERY_FETCH_SEARCH_RESULT } from '../constants/queries';
import { RECEIVE_SEARCH_RESULT } from '../constants/actionTypes';
import graphqlService from '../services/graphql';
let count = 0;
export function fetchQuerySearchResults (id, page, size) {
  const fetchQuerySearchResults_anonymousFn = function (dispatch, getState) {
    count++;
    return graphqlService(QUERY_FETCH_SEARCH_RESULT, {'id': id, 'page': page, 'size': size})
    .then(json => {
      const items = json.data.viewer.searchResult.items;
      if (!items.length) {
        console.log('AGAIN');
        setTimeout(() => {
          dispatch(fetchQuerySearchResults(id, page, size));
        }, 100);
      } else {
        console.log(count);
        count = 0;
        dispatch(receiveSearchResult(items));
        dispatch();
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

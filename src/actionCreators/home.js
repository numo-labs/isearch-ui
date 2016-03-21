import { HIDE_ADD_MESSAGE, SHOW_ADD_MESSAGE, QUERY_FETCH_SEARCH_RESULTS } from '../constants/actionTypes';

export const showAddMessage = () => (dispatch, getState) => {
  setTimeout(function () {
    return dispatch(makeAddMessageVisible());
  }, 750);
};
export const hideAddMessage = () => { return {type: HIDE_ADD_MESSAGE}; };

const makeAddMessageVisible = () => {
  return {type: SHOW_ADD_MESSAGE};
};

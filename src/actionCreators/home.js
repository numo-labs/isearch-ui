import { HIDE_ADD_MESSAGE, SHOW_ADD_MESSAGE } from '../actionTypes.js';

export const showAddMessage = () => (dispatch, getState) => {
  setTimeout(function () {
    return dispatch(makeAddMessageVisible());
  }, 750);
};
export const hideAddMessage = () => { return {type: HIDE_ADD_MESSAGE}; };

const makeAddMessageVisible = () => {
  return {type: SHOW_ADD_MESSAGE};
};

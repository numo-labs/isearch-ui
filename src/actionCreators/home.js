import { HIDE_ADD_MESSAGE, SHOW_ADD_MESSAGE } from '../actionTypes.js';

export const showAddMessage = () => { return {type: SHOW_ADD_MESSAGE}; };
export const hideAddMessage = () => { return {type: HIDE_ADD_MESSAGE}; };

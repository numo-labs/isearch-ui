import { YES_FILTER, NO_FILTER } from '../actionTypes.js';

export const yesFilter = (tagName) => { return {type: YES_FILTER, tagName}; };
export const noFilter = (tagName) => { return {type: NO_FILTER, tagName}; };

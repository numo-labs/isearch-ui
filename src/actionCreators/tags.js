import { REMOVE_TAG } from '../actionTypes.js';

export const removeTag = (tagName) => { return {type: REMOVE_TAG, tagName}; };

import { REMOVE_TAG } from '../action-types.js';

export const removeTag = (tagName) => { return {type: REMOVE_TAG, tagName}; };

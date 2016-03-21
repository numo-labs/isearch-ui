import { REMOVE_TAG } from '../constants/actionTypes';

export const removeTag = (tagName) => { return {type: REMOVE_TAG, tagName}; };

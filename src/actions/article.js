import { VIEW_ARTICLE, VIEW_SEARCH } from '../constants/actionTypes';

/**
 * Action function that handles viewing articles
 * @param  {object} content   article content
 * @return {object}           action data
 */
export const viewArticle = (content) => { return { type: VIEW_ARTICLE, content }; };

/**
 * Action to return to search page
 * @return {object}           action data
 */
export const backToSearch = () => { return { type: VIEW_SEARCH }; };

import { VIEW_ARTICLE } from '../constants/actionTypes';

/**
 * Action function that handles viewing articles
 * @param  {object} content   article content
 * @return {object}           action data
 */
export const viewArticle = (content) => { return { type: VIEW_ARTICLE, content }; };

export const getArticle = (bucketId, itemId) => {
  return (dispatch) => {
    // JQuery imported at index.html and intex.template.html
    $.getJSON(
      `https://numo-search-results.s3.amazonaws.com/ci/${bucketId}/${itemId}.json`,
      (data) => {
        console.info(data);
        dispatch(viewArticle(data.tile));
      }
    );
  };
};

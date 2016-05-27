import { VIEW_ARTICLE } from '../constants/actionTypes';

/**
 * Action function that handles viewing articles
 * @param  {object} content   article content
 * @return {object}           action data
 */
export const viewArticle = (content) => { return { type: VIEW_ARTICLE, content }; };

export const getArticle = (userId, bucketId, itemId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // JQuery imported at index.html and intex.template.html
      $.getJSON(
        // `https://numo-search-results.s3.amazonaws.com/ci/${userId}/${bucketId}/${itemId}.json`,
        'https://s3-eu-west-1.amazonaws.com/numo-search-results/ci/TESTUSERID/testhotel/article.json',
        resolve
      );
    }).then((data) => { console.info(data); dispatch(viewArticle(data.tile)); })
      .catch((err) => console.error('ERROR : ', err));
  };
};

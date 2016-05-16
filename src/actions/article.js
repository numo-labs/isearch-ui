import { VIEW_ARTICLE, VIEW_SEARCH } from '../constants/actionTypes';
import * as graphqlService from '../services/graphql';
import { QUERY_FETCH_BUCKET_ITEM } from '../constants/queries';

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

export const getArticle = (bucketId, itemId) => {
  return (dispatch) => {
    return graphqlService.query(QUERY_FETCH_BUCKET_ITEM, {'id': bucketId, 'itemId': itemId, 'itemType': 'article'})
      .then((data) => { console.log(data); dispatch(viewArticle(data)); })
      .catch((err) => console.log(err));
  };
};

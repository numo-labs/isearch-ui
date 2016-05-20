import { VIEW_ARTICLE } from '../constants/actionTypes';
import * as graphqlService from '../services/graphql';
import { QUERY_FETCH_BUCKET_ITEM } from '../constants/queries';

/**
 * Action function that handles viewing articles
 * @param  {object} content   article content
 * @return {object}           action data
 */
export const viewArticle = (content) => { return { type: VIEW_ARTICLE, content }; };

export const getArticle = (bucketId, itemId) => {
  return (dispatch) => {
    return graphqlService.query(QUERY_FETCH_BUCKET_ITEM, {'id': bucketId, 'itemId': itemId, 'itemType': 'article'})
      .then((data) => { console.log('DATA :', data); dispatch(viewArticle(data.data.viewer.searchItem.tile)); })
      .catch((err) => console.log(err));
  };
};

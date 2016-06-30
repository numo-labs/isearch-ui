import { VIEW_ARTICLE } from '../constants/actionTypes';
import 'whatwg-fetch';

import configuration from '../../config';
import configure from 'con.figure';

const config = configure(configuration);

/**
 * Action function that handles viewing articles
 * @param  {object} content   article content
 * @return {object}           action data
 */
export const viewArticle = (content) => { return { type: VIEW_ARTICLE, content }; };

export const getArticle = (bucketId, itemId) => {
  return (dispatch) => {
    const url = `${config.bucketUrl}${bucketId}/${itemId}.json`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log('parsed json', json);
        dispatch(viewArticle(json.tile));
      });
  };
};

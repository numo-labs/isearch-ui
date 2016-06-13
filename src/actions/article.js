import { VIEW_ARTICLE } from '../constants/actionTypes';

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
    // JQuery imported at index.html and intex.template.html
    $.getJSON(
      `${config.bucketUrl}${bucketId}/${itemId}.json`,
      (data) => {
        console.info(data);
        dispatch(viewArticle(data.tile));
      }
    );
  };
};

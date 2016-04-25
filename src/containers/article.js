import { connect } from 'react-redux';
import ArticleFullPage from '../components/article/';

import * as TagActions from '../actions/tags';
import * as ArticleActions from '../actions/article';

const Actions = {
  ...TagActions,
  ...ArticleActions
};

function mapStateToProps (state) {
  const {
    article: {
      articlePage,
      articleContent
    }
  } = state;
  return {
    articlePage,
    articleContent
  };
}

export default connect(mapStateToProps, Actions)(ArticleFullPage);

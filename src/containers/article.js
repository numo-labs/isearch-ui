import { connect } from 'react-redux';
import ArticleFullPage from '../components/article/';

import * as ArticleActions from '../actions/article';

const Actions = {
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

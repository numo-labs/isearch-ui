import { connect } from 'react-redux';
import ArticleFullPage from '../components/article/';

import * as ArticleActions from '../actions/article';

function mapStateToProps (state) {
  const { article: { articleContent } } = state;
  return { articleContent };
}

export default connect(mapStateToProps, ArticleActions)(ArticleFullPage);

import { connect } from 'react-redux';
import ArticleFullPage from '../components/article/';

import * as ArticleActions from '../actions/article';
import * as TagActions from '../actions/tags';
import { routerActions } from 'react-router-redux';
const Actions = {...ArticleActions, ...routerActions, ...TagActions};

function mapStateToProps (state) {
  const { article: { articleContent, viewedArticles } } = state;
  return { articleContent, viewedArticles };
}

export default connect(mapStateToProps, Actions)(ArticleFullPage);

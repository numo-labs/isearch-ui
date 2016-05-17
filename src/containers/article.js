import { connect } from 'react-redux';
import ArticleFullPage from '../components/article/';

import * as ArticleActions from '../actions/article';
import { routerActions } from 'react-router-redux';
const Actions = {...ArticleActions, ...routerActions};

function mapStateToProps (state) {
  const { article: { articleContent } } = state;
  return { articleContent };
}

export default connect(mapStateToProps, Actions)(ArticleFullPage);

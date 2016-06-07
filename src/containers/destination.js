import { connect } from 'react-redux';
import DestinationFullPage from '../components/destination/';

import * as ArticleActions from '../actions/article';
import { addSingleTag } from '../actions/tags';
import { routerActions } from 'react-router-redux';
const Actions = {...ArticleActions, ...routerActions, addSingleTag};

function mapStateToProps (state) {
  const { article: { articleContent, viewedArticles } } = state;
  return { articleContent, viewedArticles };
}

export default connect(mapStateToProps, Actions)(DestinationFullPage);

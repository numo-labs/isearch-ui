import { connect } from 'react-redux';
import ISearch from '../components/isearch/';

import * as TagActions from '../actions/tags';
import * as SearchActions from '../actions/search-results';
import * as ArticleActions from '../actions/article';

const Actions = {...TagActions, ...SearchActions, ...ArticleActions};

function mapStateToProps (state) {
  const {
    search: {
      displayedItems,
      tags,
      tiles,
      filterVisibleState,
      searchString,
      loading,
      error
    },
    article: {
      articlePage,
      articleContent
    }
  } = state;
  return {
    tags,
    displayedItems,
    tiles,
    filterVisibleState,
    searchString,
    articlePage,
    articleContent,
    loading,
    error
  };
}

export default connect(mapStateToProps, Actions)(ISearch);

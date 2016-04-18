import { connect } from 'react-redux';
import ISearch from '../components/isearch/';

import * as TagActions from '../actions/tags';
import * as SearchActions from '../actions/search-results';
import * as TileActions from '../actions/tiles';
import * as ArticleActions from '../actions/article';

const Actions = {...TagActions, ...SearchActions, ...TileActions, ...ArticleActions};

function mapStateToProps (state) {
  const { search: { items, tags, tiles, filterVisibleState, searchString }, article: {articlePage, articleContent} } = state;
  return {
    tags,
    items,
    tiles,
    filterVisibleState,
    searchString,
    articlePage,
    articleContent
  };
}

export default connect(mapStateToProps, Actions)(ISearch);

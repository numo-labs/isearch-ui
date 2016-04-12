import { connect } from 'react-redux';
import ISearch from '../components/isearch/';

import * as TagActions from '../actions/tags';
import * as SearchActions from '../actions/search-results';
import * as TileActions from '../actions/tiles';

const Actions = {...TagActions, ...SearchActions, ...TileActions};

function mapStateToProps (state) {
  const { search: { items, tags, tiles, filterVisibleState, searchString } } = state;
  return {
    tags,
    items,
    tiles,
    filterVisibleState,
    searchString
  };
}

export default connect(mapStateToProps, Actions)(ISearch);

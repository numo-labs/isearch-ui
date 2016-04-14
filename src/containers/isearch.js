import { connect } from 'react-redux';
import ISearch from '../components/isearch/';

import * as TagActions from '../actions/tags';
import * as SearchActions from '../actions/search-results';
import * as TileActions from '../actions/tiles';

const Actions = {...TagActions, ...SearchActions, ...TileActions};

function mapStateToProps (state) {
  const { search: { displayedItems, tags, tiles, filterVisibleState, searchString } } = state;
  return {
    tags,
    displayedItems,
    tiles,
    filterVisibleState,
    searchString
  };
}

export default connect(mapStateToProps, Actions)(ISearch);

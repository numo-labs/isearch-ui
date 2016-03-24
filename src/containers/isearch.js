import React from 'react';
import { connect } from 'react-redux';
import ISearch from '../components/isearch/';

import * as TagActions from '../actions/tags';
import * as SearchActions from '../actions/search-results';
import * as TileActions from '../actions/tiles';
import * as HomeActions from '../actions/home';

const Actions = {...TagActions, ...SearchActions, ...TileActions};

function mapStateToProps (state) {
    const { search: { items, tags, tiles, filterVisibleState } } = state;
    return {
      tags,
      items,
      tiles,
      filterVisibleState
    };
}

export default connect(mapStateToProps, Actions)(ISearch);

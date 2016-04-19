import { connect } from 'react-redux';
import ISearch from '../components/isearch/';

import * as TagActions from '../actions/tags';
import * as SearchActions from '../actions/search-results';

const Actions = {...TagActions, ...SearchActions};

function mapStateToProps (state) {
  const {
    search: {
      displayedItems,
      tags,
      tiles,
      filterVisibleState,
      searchString,
      loading,
      error,
      autocompleteError,
      autocompleteOptions,
      searchString
    }
  } = state;
  return {
    tags,
    displayedItems,
    tiles,
    filterVisibleState,
    searchString,
    loading,
    error,
    autocompleteError,
    autocompleteOptions,
    searchString
  };
}

export default connect(mapStateToProps, Actions)(ISearch);

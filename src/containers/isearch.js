import { connect } from 'react-redux';
import ISearch from '../components/isearch/';

import * as TagActions from '../actions/tags';
import * as AutocompleteActions from '../actions/autocomplete';
import * as SearchActions from '../actions/search-results';

const Actions = {...TagActions, ...SearchActions, ...AutocompleteActions};

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
      inAutoCompleteSearch
    }
  } = state;
  console.log('state', state);
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
    inAutoCompleteSearch
  };
}

export default connect(mapStateToProps, Actions)(ISearch);

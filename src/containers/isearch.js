import { connect } from 'react-redux';
import ISearch from '../components/isearch/';
import * as TagActions from '../actions/tags';
import * as AutocompleteActions from '../actions/autocomplete';
import * as SearchActions from '../actions/search-results';
import * as HotelActions from '../actions/hotel';
import * as ArticleActions from '../actions/article';

const Actions = {
  ...TagActions,
  ...SearchActions,
  ...AutocompleteActions,
  ...ArticleActions,
  ...HotelActions
};

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
    },
    hotel: {
      hotelPage
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
    error,
    hotelPage,
    autocompleteError,
    autocompleteOptions,
    inAutoCompleteSearch
  };
}

export default connect(mapStateToProps, Actions)(ISearch);

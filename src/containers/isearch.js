import { connect } from 'react-redux';
import ISearch from '../components/isearch/';
import * as TagActions from '../actions/tags';
import * as AutocompleteActions from '../actions/autocomplete';
import * as SearchActions from '../actions/search-results';
import * as HotelActions from '../actions/hotel';
import * as ArticleActions from '../actions/article';
import * as TravelInfoActions from '../actions/travel-info';
import { routerActions } from 'react-router-redux';
const Actions = {
  ...TagActions,
  ...SearchActions,
  ...AutocompleteActions,
  ...ArticleActions,
  ...HotelActions,
  ...TravelInfoActions,
  ...routerActions
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
      inAutoCompleteSearch,
      numberOfAdultsTitle,
      numberOfChildrenTitle,
      durationTitle,
      bucketId
    },
    travelInfo: {
      numberOfChildren,
      numberOfAdults,
      childAge1,
      childAge2,
      childAge3,
      childAge4,
      departureAirport,
      duration,
      departureDate
    },
    hotel: {
      hotelPage,
      hotelInView
    },
    article: {
      articlePage,
      articleContent,
      onAddArticleTag
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
    onAddArticleTag,
    loading,
    error,
    hotelPage,
    autocompleteError,
    autocompleteOptions,
    inAutoCompleteSearch,
    hotelInView,
    numberOfChildren,
    numberOfAdults,
    childAge1,
    childAge2,
    childAge3,
    childAge4,
    departureAirport,
    duration,
    departureDate,
    numberOfAdultsTitle,
    numberOfChildrenTitle,
    durationTitle,
    bucketId
  };
}

export default connect(mapStateToProps, Actions)(ISearch);

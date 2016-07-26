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
      searchString,
      loading,
      error,
      autocompleteError,
      autocompleteOptions,
      inAutoCompleteSearch,
      resultId,
      searchComplete,
      feedEnd,
      isInitialTag
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
      departureDate,
      danishDepartureDate,
      numberOfAdultsTitle,
      numberOfChildrenTitle,
      durationTitle,
      editDetailsVisible
    },
    hotel: {
      hotelPage,
      hotelInView
    },
    article: {
      articlePage,
      articleContent,
      onAddArticleTag,
      viewedArticles
    }
  } = state;
  return {
    tags,
    displayedItems,
    tiles,
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
    danishDepartureDate,
    numberOfAdultsTitle,
    numberOfChildrenTitle,
    durationTitle,
    resultId,
    viewedArticles,
    searchComplete,
    feedEnd,
    editDetailsVisible,
    isInitialTag
  };
}

export default connect(mapStateToProps, Actions)(ISearch);

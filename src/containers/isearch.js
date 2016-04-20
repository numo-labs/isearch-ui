import { connect } from 'react-redux';
import ISearch from '../components/isearch/';

import * as TagActions from '../actions/tags';
import * as SearchActions from '../actions/search-results';
import * as HotelActions from '../actions/hotel';

const Actions = {...TagActions, ...SearchActions, ...HotelActions};

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
    hotel: {
      hotelPage
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
    hotelPage
  };
}

export default connect(mapStateToProps, Actions)(ISearch);

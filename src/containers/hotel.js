import { connect } from 'react-redux';
import HotelPage from '../components/hotel/';

import * as HotelActions from '../actions/hotel';

const Actions = {
  ...HotelActions
};

function mapStateToProps (state) {
  const {
    hotel: {
      hotelPage,
      hotelInView
    }
  } = state;
  return {
    hotelPage,
    hotelInView
  };
}

export default connect(mapStateToProps, Actions)(HotelPage);


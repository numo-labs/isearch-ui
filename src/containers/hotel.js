import { connect } from 'react-redux';
import HotelPage from '../components/hotel/';

import * as HotelActions from '../actions/hotel';

function mapStateToProps (state) {
  const { hotel: { hotelInView } } = state;
  return { packageOffer: hotelInView };
}

export default connect(mapStateToProps, HotelActions)(HotelPage);

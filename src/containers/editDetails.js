import { connect } from 'react-redux';
import EditDetails from '../components/edit-details';
import * as TravelInfoActions from '../actions/travel-info';
import { routerActions } from 'react-router-redux';
const Actions = {...TravelInfoActions, ...routerActions};

function mapStateToProps (state) {
  const {
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
     passengerBirthdays
    }
  } = state;
  return {
    numberOfChildren,
    numberOfAdults,
    childAge1,
    childAge2,
    childAge3,
    childAge4,
    departureAirport,
    duration,
    departureDate,
    passengerBirthdays
  };
}

export default connect(mapStateToProps, Actions)(EditDetails);

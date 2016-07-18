import { connect } from 'react-redux';
import EditDetails from '../components/edit-details';
import * as TravelInfoActions from '../actions/travel-info';
import * as SearchActions from '../actions/search-results';
import { routerActions } from 'react-router-redux';
const Actions = {...TravelInfoActions, ...SearchActions, ...routerActions};

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
     danishDepartureDate,
     passengerBirthdays,
     editDetailsVisible
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
    danishDepartureDate,
    passengerBirthdays,
    editDetailsVisible
  };
}

export default connect(mapStateToProps, Actions)(EditDetails);

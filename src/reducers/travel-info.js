'use strict';

import moment from 'moment';
import departOnFriday from '../utils/departure-day-format';

import {
  SET_CHILD_AGE,
  SET_NUMBER_OF_ADULTS,
  SET_NUMBER_OF_CHILDREN,
  SET_DURATION,
  SET_DEPARTURE_DATE,
  SET_DEPARTURE_AIRPORT,
  UPDATE_HEADER_TITLES,
  SHOW_TRAVEL_INFO,
  HIDE_TRAVEL_INFO
} from '../constants/actionTypes';

export const initialState = {
  numberOfChildren: '0',
  numberOfAdults: '2',
  childAge1: '2 Barns alder',
  childAge2: '4 Barns alder',
  childAge3: '0 Barns alder',
  childAge4: '0 Barns alder',
  departureAirport: 'Overalt',
  duration: '1 uge',
  departureDate: departOnFriday(moment().add(3, 'months')).format('YYYY-MM-DD'),
  danishDepartureDate: '',
  passengerBirthdays: [],
  numberOfChildrenTitle: '0',
  numberOfAdultsTitle: '2',
  durationTitle: '1 uger',
  editDetailsVisible: false
};

export default function travelInfo (state = initialState, action) {
  switch (action.type) {
    case SET_CHILD_AGE:
      return {
        ...state,
        [`childAge${action.index}`]: action.childAge
      };
    case SET_NUMBER_OF_ADULTS:
      return {
        ...state,
        numberOfAdults: action.numberOfAdults
      };
    case SET_NUMBER_OF_CHILDREN:
      return {
        ...state,
        numberOfChildren: action.numberOfChildren
      };
    case SET_DURATION:
      return {
        ...state,
        duration: action.duration
      };
    case SET_DEPARTURE_DATE:
      const day = action.departureDate.split('-')[2];
      const month = action.departureDate.split('-')[1];
      const year = action.departureDate.split('-')[0];
      const danishDepartureDate = `${day}/${month}-${year}`;
      return {
        ...state,
        departureDate: action.departureDate,
        danishDepartureDate: danishDepartureDate
      };
    case SET_DEPARTURE_AIRPORT:
      return {
        ...state,
        departureAirport: action.departureAirport
      };
    case UPDATE_HEADER_TITLES:
      return {
        ...state,
        numberOfAdultsTitle: state.numberOfAdults,
        numberOfChildrenTitle: state.numberOfChildren,
        durationTitle: state.duration
      };
    case SHOW_TRAVEL_INFO:
      return {
        ...state,
        editDetailsVisible: true
      };
    case HIDE_TRAVEL_INFO:
      return {
        ...state,
        editDetailsVisible: false
      };
    default:
      return state;
  }
}

'use strict';
import moment from 'moment';
import {
  SET_CHILD_AGE,
  SET_NUMBER_OF_ADULTS,
  SET_NUMBER_OF_CHILDREN,
  SET_DURATION,
  SET_DEPARTURE_DATE,
  SET_DEPARTURE_AIRPORT
} from '../constants/actionTypes';

export const initialState = {
  numberOfChildren: '0',
  numberOfAdults: '2',
  childAge1: '2 Barns alder',
  childAge2: '4 Barns alder',
  childAge3: '0 Barns alder',
  childAge4: '0 Barns alder',
  departureAirport: 'Copenhagen - CPH',
  duration: '1 uge',
  departureDate: moment().add(14, 'days').format('YYYY-MM-DD'),
  passengerBirthdays: []
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
      return {
        ...state,
        departureDate: action.departureDate
      };
    case SET_DEPARTURE_AIRPORT:
      return {
        ...state,
        departureAirport: action.departureAirport
      };
    default:
      return state;
  }
}

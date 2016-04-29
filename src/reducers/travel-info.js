'use strict';

import {
  SET_CHILD_AGE,
  SET_NUMBER_OF_ADULTS,
  SET_NUMBER_OF_CHILDREN,
  SET_DURATION,
  SET_DEPARTURE_DATE,
  SET_DEPARTURE_AIRPORT,
  SET_PASSENGER_BIRTHDAYS
} from '../constants/actionTypes';

function constructDefaultDepartureDate () {
  const defaultYear = new Date().toString().split(' ')[3];
  let defaultMonth = new Date().toString().split(' ')[1];
  const defaultDay = new Date().toString().split(' ')[2];
  if (defaultMonth.length < 2) {
    defaultMonth = '0' + defaultMonth;
  }
  const defaultDepartureDate = `${defaultYear}-${defaultMonth}-${defaultDay}`;
  return defaultDepartureDate;
}

const defaultDepartureDate = constructDefaultBirthday();

export const initialState = {
  numberOfChildren: '2',
  numberOfAdults: '2',
  childAge1: '0 years',
  childAge2: '0 years',
  childAge3: '0 years',
  childAge4: '0 years',
  departureAirport: 'Copenhagen - CPH',
  duration: '2 weeks',
  departureDate: defaultDepartureDate,
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

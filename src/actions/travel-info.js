import {
  SET_CHILD_AGE,
  SET_NUMBER_OF_ADULTS,
  SET_NUMBER_OF_CHILDREN,
  SET_DURATION,
  SET_DEPARTURE_DATE,
  SET_DEPARTURE_AIRPORT,
  SET_PASSENGER_BIRTHDAYS
} from '../constants/actionTypes';

export const setChildAge = (childAge, index) => { return {type: SET_CHILD_AGE, childAge, index}; };
export const setNumberOfAdults = (numberOfAdults) => { return {type: SET_NUMBER_OF_ADULTS, numberOfAdults}; };
export const setNumberOfChildren = (numberOfChildren) => { return {type: SET_NUMBER_OF_CHILDREN, numberOfChildren}; };
export const setDuration = (duration) => { return {type: SET_DURATION, duration}; };
export const setDepartureAirport = (departureAirport) => { return {type: SET_DEPARTURE_AIRPORT, departureAirport}; };
export const setDepartureDate = (departureDate) => { return { type: SET_DEPARTURE_DATE, departureDate }; };
export const setPassengerBirthdays = (passengerBirthdays) => { return {type: SET_PASSENGER_BIRTHDAYS, passengerBirthdays}; };

import { VIEW_HOTEL, SET_HOTEL_PAGE } from '../constants/actionTypes';

export const viewHotel = () => { return {type: VIEW_HOTEL}; };

export const setHotelPage = (hotel) => { return {type: SET_HOTEL_PAGE, hotel}; };

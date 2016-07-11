import { VIEW_HOTEL, SET_HOTEL_PAGE } from '../constants/actionTypes';
import * as eventStream from './event-stream.js';
import configuration from '../../config';
import configure from 'con.figure';
import 'whatwg-fetch';

const config = configure(configuration);

export const viewHotel = () => { return {type: VIEW_HOTEL}; };

export const setHotelPage = (hotel) => { return {type: SET_HOTEL_PAGE, hotel}; };

export const getHotel = (bucketId, itemId) => {
  return (dispatch) => {
    const url = `${config.bucketUrl}${bucketId}/${itemId}.json`;
    fetch(url)
      .then(response => response.json())
      .then((json) => {
        console.log('parsed json', json);
        dispatch(eventStream.push('view', itemId));
        dispatch(setHotelPage(json.packageOffer));
      });
  };
};

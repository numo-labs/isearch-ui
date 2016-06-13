import { VIEW_HOTEL, SET_HOTEL_PAGE } from '../constants/actionTypes';
import configuration from '../../config';
import configure from 'con.figure';

const config = configure(configuration);

export const viewHotel = () => { return {type: VIEW_HOTEL}; };

export const setHotelPage = (hotel) => { return {type: SET_HOTEL_PAGE, hotel}; };

export const getHotel = (bucketId, itemId) => {
  return (dispatch) => {
    // JQuery imported at index.html and intex.template.html
    $.getJSON(
      `${config.bucketUrl}${bucketId}/${itemId}.json`,
      (data) => {
        console.info(data);
        dispatch(setHotelPage(data.packageOffer));
      }
    );
  };
};

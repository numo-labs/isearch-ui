import { VIEW_HOTEL, SET_HOTEL_PAGE } from '../constants/actionTypes';

export const viewHotel = () => { return {type: VIEW_HOTEL}; };

export const setHotelPage = (hotel) => { return {type: SET_HOTEL_PAGE, hotel}; };

export const getHotel = (bucketId, itemId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // JQuery imported at index.html and intex.template.html
      $.getJSON(
        `https://numo-search-results.s3.amazonaws.com/ci/${bucketId}/${itemId}.json`,
        // 'https://s3-eu-west-1.amazonaws.com/numo-search-results/ci/TESTUSERID/testhotel/hotel.json',
        resolve
      );
    }).then((data) => { console.info(data); dispatch(setHotelPage(data.packageOffer)); })
      .catch((err) => console.error('ERROR : ', err));
  };
};

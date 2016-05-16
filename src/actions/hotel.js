import { VIEW_HOTEL, SET_HOTEL_PAGE } from '../constants/actionTypes';
import { QUERY_FETCH_BUCKET_ITEM } from '../constants/queries';
import * as graphqlService from '../services/graphql';

export const viewHotel = () => { return {type: VIEW_HOTEL}; };

export const setHotelPage = (hotel) => { return {type: SET_HOTEL_PAGE, hotel}; };

export const getHotel = (bucketId, itemId) => {
  return (dispatch) => {
    return graphqlService.query(QUERY_FETCH_BUCKET_ITEM, {'id': bucketId, 'itemId': itemId, 'itemType': 'package'})
      .then((data) => { console.log(data); dispatch(setHotelPage(data.data.viewer.searchItem)); })
      .catch((err) => console.log(err));
  };
};

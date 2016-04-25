'use strict';

import { VIEW_HOTEL, VIEW_SEARCH, SET_HOTEL_PAGE } from '../constants/actionTypes';

const initialState = {
  hotelPage: false,
  hotelInView: {
    description: '',
    hotel: {
      id: '',
      name: '',
      images: [],
      starRating: '0',
      place: {
        name: '',
        country: '',
        region: ''
      }
    },
    flights: {
      outbound: [{
        number: '',
        departure: {
          localDateTime: '',
          airport: {
            code: '',
            name: ''
          }
        },
        arrival: {
          localDateTime: '',
          airport: {
            code: ''
          }
        },
        carrier: {
          code: ''
        }
      }],
      inbound: [{
        number: '',
        departure: {
          localDateTime: '',
          airport: {
            code: '',
            name: ''
          }
        },
        arrivale: {
          localDateTime: '',
          airport: {
            code: ''
          }
        },
        carrier: {
          code: ''
        }
      }]
    },
    price: {
      total: '',
      perPerson: '',
      currency: ''
    },
    provider: {
      id: '',
      reference: '',
      deepLink: ''
    },
    nights: 0,
    amenities: {
      outdoorpool: '0 stk.',
      distancetobeach: '0 m',
      distancetocenter: '0 m',
      bar: true,
      childrenpool: true,
      elevator: true,
      poolbar: true,
      restaurant: true,
      minimarket: true,
      cleaningdaysperweek: '0',
      wifi: true,
      waterslide: true,
      lolloandbernie: true,
      isadulthotel: true,
      allinclusive: true
    }
  }
};

export default function hotel (state = initialState, action) {
  switch (action.type) {
    case VIEW_HOTEL:
      return {
        ...state,
        hotelPage: true
      };
    case VIEW_SEARCH:
      return {
        ...state,
        hotelPage: false
      };
    case SET_HOTEL_PAGE:
      return {
        ...state,
        hotelInView: action.hotel
      };
    default:
      return state;
  }
}

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import HotelPage from '../';

const props = {
  packageOffer: {
    hotel: {
      starRating: 5,
      images: {
        small: [
          {
            uri: ''
          }
        ],
        large: [
          {
            uri: ''
          }
        ]
      },
      name: 'Sun Wing',
      place: {
        country: '',
        region: '',
        name: ''
      }
    },
    provider: {
      context: ''
    },
    nights: 5,
    flights: {
      outbound: [ {
        departure: {
          localDateTime: ''
        }
      } ],
      inbound: [ {
        departure: {
          localDateTime: ''
        }
      } ]
    },
    price: {
      perPerson: ''
    },
    amenities: {
      allinclusive: false,
      bar: true,
      childrenpool: true,
      cleaningdaysperweek: '6',
      distancetobeach: '300 m',
      distancetocenter: '200 m',
      elevator: true,
      isadulthotel: false,
      lolloandbernie: false,
      minimarket: false,
      outdoorpool: '2 stk.',
      poolbar: true,
      restaurant: true,
      waterslide: false,
      wifi: true
    }
  }
};

describe('Component', function () {
  const wrapper = shallow(<HotelPage {...props} />);
  const children = wrapper.children().nodes;
  describe('<HotelPage /> Component', function () {
    it('should render our HotelPage component', function (done) {
      expect(children).to.have.length(4);
      done();
    });
  });
});

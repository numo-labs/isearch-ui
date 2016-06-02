import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import HotelPage from '../../src/components/hotel';

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
      description: 'hotel description',
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
  },
  params: {
    bucketId: '12345',
    itemId: '1234556'
  },
  getHotel: () => {}
};

describe('Component', function () {
  describe('<HotelPage /> Component', function () {
    it('should render our HotelPage component', function (done) {
      const wrapper = shallow(<HotelPage {...props} />);
      const children = wrapper.children().nodes;
      expect(children).to.have.length(4);
      done();
    });
    it('should admit a boolean at amenities', function (done) {
      var props2 = {...props};
      props2.packageOffer.amenities.distancetobeach = true;
      const wrapper = shallow(<HotelPage {...props2} />);
      const children = wrapper.children().nodes;
      expect(children).to.have.length(4);
      done();
    });
  });
});

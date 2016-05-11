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
      outbound: [{
        departure: {
          localDateTime: ''
        }
      }],
      inbound: [{
        departure: {
          localDateTime: ''
        }
      }]
    },
    price: {
      perPerson: ''
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

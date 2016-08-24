import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import HotelPage from '../../src/components/hotel';

const defaultProps = {
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
      global.dataLayer = [];
      const wrapper = shallow(<HotelPage {...defaultProps} />);
      const title = wrapper.find('.titlePackage').text();
      const children = wrapper.children().nodes;
      expect(children).to.have.length(4);
      expect(title).to.equal('Sun Wing');
      done();
    });
    it('should render the correct children', function (done) {
      const wrapper = shallow(<HotelPage {...defaultProps} />);
      expect(wrapper.find('div')).to.have.length(47);
      expect(wrapper.find('NavHeader')).to.have.length(1);
      expect(wrapper.find('FadeImage')).to.have.length(1);
      expect(wrapper.find('ISearchSlider')).to.have.length(1);
      expect(wrapper.find('StarRating')).to.have.length(1);
      expect(wrapper.find('img')).to.have.length(1);
      expect(wrapper.find('span')).to.have.length(2);
      done();
    });
    it('should admit a boolean at amenities', function (done) {
      var props2 = {...defaultProps};
      props2.packageOffer.amenities.distancetobeach = true;
      const wrapper = shallow(<HotelPage {...props2} />);
      const children = wrapper.children().nodes;
      expect(children).to.have.length(4);
      done();
    });
    it('should render the full page with empty contents if there is no hotel description', function (done) {
      global.dataLayer = null;
      const props = { ...defaultProps, packageOffer: { hotel: { description: null } } };
      const wrapper = shallow(<HotelPage {...props} />);
      const title = wrapper.find('.titlePackage').text();
      const children = wrapper.children().nodes;
      expect(children).to.have.length(4);
      expect(title).to.equal('');
      done();
    });
  });
});

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
        country: 'Spanien',
        region: 'Mallorca',
        name: 'Playa de las Americas'
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
      perPerson: '1000'
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
    it('should render the correct content', function (done) {
      const wrapper = shallow(<HotelPage {...defaultProps} />);
      const packageTitle = wrapper.find('.titlePackage').text();
      const packageSubtitle = wrapper.find('.subtitlePackage').text();
      const country = defaultProps.packageOffer.hotel.place.country + ', ';
      const region = defaultProps.packageOffer.hotel.place.region + ', ';
      const name = defaultProps.packageOffer.hotel.place.name;
      const packageDescription = wrapper.find('.textVisible').text();
      const description = defaultProps.packageOffer.hotel.description;
      const hotelPrice1 = wrapper.find('.hotelPrice1').text();
      const hotelPrice2 = wrapper.find('.hotelPrice2').text();
      const pricePerPerson1 = wrapper.find('.ppp1').text();
      const pricePerPerson2 = wrapper.find('.ppp2').text();
      const bookButtonText1 = wrapper.find('.bookButton1').text();
      const bookButtonText2 = wrapper.find('.bookButton2').text();
      expect(packageTitle).to.equal(defaultProps.packageOffer.hotel.name);
      expect(packageSubtitle).to.equal(country + region + name);
      expect(packageDescription).to.equal(description);
      expect(hotelPrice1).to.equal('1000,-');
      expect(hotelPrice2).to.equal('1000,-');
      expect(pricePerPerson1).to.equal('Pr. person');
      expect(pricePerPerson2).to.equal('Pr. person');
      expect(bookButtonText1).to.equal('SE PRIS OG BESTIL');
      expect(bookButtonText2).to.equal('SE PRIS OG BESTIL');
      expect(wrapper.find('NavHeader')).to.have.length(1);
      expect(wrapper.find('FadeImage')).to.have.length(1);
      expect(wrapper.find('ISearchSlider')).to.have.length(1);
      expect(wrapper.find('StarRating')).to.have.length(1);
      done();
    });
    it('renderFactList() should render the correct facts', function (done) {
      const wrapper = shallow(<HotelPage {...defaultProps} />);
      const factHeading = wrapper.find('.factHeading').text();
      const factList = wrapper.find('.factListWrapper').text();
      const list = 'HotelfaktaLokalt centrum200mPool2BarJaBørnepoolJaElevatorJaPoolbarJaRestaurantJaWifiJa';
      expect(factHeading).to.equal('Hotelfakta');
      expect(factList).to.equal(list);
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

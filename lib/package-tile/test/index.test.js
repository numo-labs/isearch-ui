import React from 'react';
import { shallow } from 'enzyme';
import PackageTile from '../';
import { expect } from 'chai';

const props = {
  packageOffer: {
    hotel: {
      concept: {
        id: 'test',
        title: 'test'
      },
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
        country: 'Spanien',
        region: 'Mallorca',
        name: 'Playa De Las Americas'
      }
    },
    provider: {
      context: ''
    },
    nights: 5,
    flights: {
      outbound: [{
        departure: {
          localDateTime: '01/01/2016'
        }
      }],
      inbound: [{
        departure: {
          localDateTime: '02/01/2016'
        }
      }]
    },
    price: {
      perPerson: '1000',
      discountPrice: '500'
    }
  }
};

const emptyProps = {
  packageOffer: {
    hotel: {
      concept: {
        id: 'test',
        title: 'test'
      },
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
        country: 'Spanien',
        region: undefined,
        name: 'Playa De Las Americas'
      }
    },
    provider: {
      context: ''
    },
    nights: 5,
    flights: {
      outbound: [],
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
describe('<PackageTile /> Component', () => {
  it('should render our <PackageTile /> component', function (done) {
    const wrapper = shallow(<PackageTile {...props} />);
    const children = wrapper.children().nodes;
    expect(children).to.have.length(4);
    done();
  });
  it('it should have the correct props', (done) => {
    const wrapper = shallow(<PackageTile {...props}/>);
    expect(wrapper.find('.packageTitle').text()).to.equal(props.packageOffer.hotel.name);
    expect(wrapper.find('StarRating').length).to.equal(1);
    done();
  });
  it('should render the correct content', function (done) {
    const wrapper = shallow(<PackageTile {...props} />);
    const packageTitle = wrapper.find('.packageTitle').text();
    const nights = wrapper.find('.nights').text();
    const price = wrapper.find('.price').text();
    const pricePerPerson = wrapper.find('.pricePerPerson').text();
    expect(packageTitle).to.equal(props.packageOffer.hotel.name);
    expect(nights).to.equal(props.packageOffer.nights + ' nætter');
    expect(price).to.equal('1000,-');
    expect(pricePerPerson).to.equal('Pr. person');
    done();
  });
  it('formatFlightInfo() should render flight dates when available', function (done) {
    const wrapper = shallow(<PackageTile {...props} />);
    const dates = wrapper.find('.date').text();
    expect(dates).to.equal('1. Jan  -  1. Feb');
    done();
  });
  it('formatFlightInfo() should render error message when no flight information available', function (done) {
    const wrapper = shallow(<PackageTile {...emptyProps} />);
    const errorMessage = wrapper.find('.date').text();
    expect(errorMessage).to.equal('date information currently unavailable');
    done();
  });
  it('formatDiscountPrice() should render the price when available', function (done) {
    const wrapper = shallow(<PackageTile {...props} />);
    const discountPrice = wrapper.find('.discountPrice').text();
    expect(discountPrice).to.equal('500,-');
    done();
  });
  it('formatDiscountPrice() should render empty string when unavailable', function (done) {
    const wrapper = shallow(<PackageTile {...emptyProps} />);
    const discountPrice = wrapper.find('.discountPrice').text();
    expect(discountPrice).to.equal('');
    done();
  });
  it('formatLocation() should render the country, region, name', function (done) {
    const wrapper = shallow(<PackageTile {...props} />);
    const location = wrapper.find('.packageSubtitle').text();
    expect(location).to.equal('Spanien, Mallorca, Playa De Las Americas');
    done();
  });
  it('formatLocation() should render country & name when region is unavailable', function (done) {
    const wrapper = shallow(<PackageTile {...emptyProps} />);
    const location = wrapper.find('.packageSubtitle').text();
    expect(location).to.equal('Spanien, Playa De Las Americas');
    done();
  });
});

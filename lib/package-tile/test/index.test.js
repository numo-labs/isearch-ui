import React from 'react';
import { mount } from 'enzyme';
import jsdom from 'mocha-jsdom';
import PackageTile from '../';
import expect from 'expect';

const props = {
  packageOffer: {
    hotel: {
      starRating: 5,
      images: [
        {
          uri: ''
        }
      ],
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

describe('<PackageTile /> Test', () => {
  jsdom();

  it('it should have the correct props', (done) => {
    const wrapper = mount(<PackageTile {...props}/>);
    expect(wrapper.props()).toEqual(props);
    expect(wrapper.find('.packageTitle').text()).toEqual(props.packageOffer.hotel.name);
    expect(wrapper.find('StarRating').length).toEqual(1);
    done();
  });
});

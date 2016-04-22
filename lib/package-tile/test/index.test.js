import React from 'react';
import { mount } from 'enzyme';
import jsdom from 'mocha-jsdom';
import PackageTile from '../';
import { expect } from 'chai';

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

describe('<PackageTile /> Component', () => {
  jsdom();

  it('it should have the correct props', (done) => {
    const wrapper = mount(<PackageTile {...props}/>);
    expect(wrapper.props()).to.deep.equal(props);
    expect(wrapper.find('.packageTitle').text()).to.equal(props.packageOffer.hotel.name);
    expect(wrapper.find('StarRating').length).to.equal(1);
    done();
  });
});

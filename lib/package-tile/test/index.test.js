import React from 'react';
import { mount } from 'enzyme'
import jsdom from 'mocha-jsdom';
import PackageTile from '../'
import expect from 'expect';

const defaultProps = {
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
      },
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
      }]
    },
    price: {
      perPerson: ''
    },
  }
};

function setProps (props) {
  return {
    ...defaultProps,
    props
  }
};

describe('<PackageTile /> Test', () => {
  jsdom();

  it('it should have the correct props', (done) => {
    const props = setProps({});
    const wrapper = mount(<PackageTile {...props}/>);
    expect(wrapper.props()).toEqual(props);
    expect(wrapper.find('.packageTitle').text()).toEqual(props.packageOffer.hotel.name);
    expect(wrapper.find('StarRating').length).toEqual(1);
    done();
  })
});

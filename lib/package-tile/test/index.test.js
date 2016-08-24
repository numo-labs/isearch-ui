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
  it('should render our <PackageTile /> component', function (done) {
    const wrapper = shallow(<PackageTile {...props} />);
    const children = wrapper.children().nodes;
    expect(children).to.have.length(4);
    done();
  });
  it('should render the correct children', function (done) {
    const wrapper = shallow(<PackageTile {...props} />);
    expect(wrapper.find('div')).to.have.length(16);
    expect(wrapper.find('FadeImage')).to.have.length(1);
    expect(wrapper.find('StarRating')).to.have.length(1);
    done();
  });
  it('it should have the correct props', (done) => {
    const wrapper = shallow(<PackageTile {...props}/>);
    expect(wrapper.find('.packageTitle').text()).to.equal(props.packageOffer.hotel.name);
    expect(wrapper.find('StarRating').length).to.equal(1);
    done();
  });
});

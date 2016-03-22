import React from 'react';
import { shallow } from 'enzyme';
import StarRating from '../';
import expect from 'expect';

describe('<StarRating /> Test', () => {
  it('it should display the correct number of highlighted and unhighlighted icons', (done) => {
    const wrapper = shallow(<StarRating starRating={3} ratingIconUrl={''}/>);
    expect(wrapper.find('.ratingIcon').length).toEqual(3);
    expect(wrapper.find('.ratingIconBlur').length).toEqual(2);
    done();
  });
  it('can only display highlighted icons up to a max rating value (passed in as a prop or default)', (done) => {
    const wrapper = shallow(<StarRating starRating={8} ratingIconUrl={''}/>);
    expect(wrapper.find('.ratingIcon').length).toEqual(5);
    expect(wrapper.find('.ratingIconBlur').length).toEqual(0);
    done();
  });
});

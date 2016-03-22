import React from 'react';
import { shallow } from 'enzyme'
import jsdom from 'mocha-jsdom';
import StarRating from '../star-rating.js';
import expect from 'expect';

describe('<StarRating /> Test', () => {
  jsdom();

  it('it should display the correct number of highlighted and unhighlighted icons', (done) => {
    const wrapper = shallow(<StarRating starRating={3}/>);
    expect(wrapper.find('.ratingIcon').length).toEqual(3);
    expect(wrapper.find('.ratingIconBlur').length).toEqual(2);
    done();
  });
  it('can only display highlighted icons up to a max rating value (passed in as a prop or default)', (done) => {
    const wrapper = shallow(<StarRating starRating={8}/>);
    expect(wrapper.find('.ratingIcon').length).toEqual(5);
    expect(wrapper.find('.ratingIconBlur').length).toEqual(0);
    done();
  });
});

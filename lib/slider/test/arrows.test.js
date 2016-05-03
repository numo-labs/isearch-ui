import React from 'react';
import { shallow } from 'enzyme';
import { SliderArrowLeft, SliderArrowRight } from '../arrows.js';
import { expect } from 'chai';

describe('Component', function () {
  describe('<SliderArrowLeft />', function () {
    it('Should render a left arrow', function (done) {
      const wrapper = shallow(<SliderArrowLeft/>);
      expect(wrapper.find('.left-arrow')).to.have.length(1);
      done();
    });
  });
  describe('<SliderArrowRight />', function () {
    it('Should render a right arrow', function (done) {
      const wrapper = shallow(<SliderArrowRight/>);
      expect(wrapper.find('.right-arrow')).to.have.length(1);
      done();
    });
  });
});

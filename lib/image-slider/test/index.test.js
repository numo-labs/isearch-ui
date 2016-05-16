import React from 'react';
import { shallow } from 'enzyme';
import ISearchSlider from '../';
import { expect } from 'chai';

describe('Component', function () {
  describe('<ISearchSlider />', function () {
    it('Should render a slider', function (done) {
      const images = ['image1', 'image2'];
      const wrapper = shallow(<ISearchSlider images={images} className='testslider'/>);
      expect(wrapper.find('.testslider')).to.have.length(1);
      done();
    });
  });
});

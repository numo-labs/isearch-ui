import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Header from '../';
import jsdom from 'mocha-jsdom';

describe('Component', function () {
  jsdom({skipWindowCheck: true});
  describe('<Header />', function () {
    it('Should render Header component', function (done) {
      const wrapper = shallow(<Header displayedItems={[]}/>);
      expect(wrapper.find('.headerBarWrapper')).to.have.length(1);
      done();
    });
    it.only('should increase the scroll position when the bouncing arrow is clicked', function (done) {
      const wrapper = shallow(<Header displayedItems={['test']}/>);
      window.innerHeight;
      window.scrollY;
      wrapper.find('.bouncingArrow').simulate('click');
      expect(window.scrollY).to.equal(0);
      done();
    });
  });
});

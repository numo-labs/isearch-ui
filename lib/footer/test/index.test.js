import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Footer from '../';

describe('Component', function () {
  describe('<Footer />', function () {
    it('Should contain a .footer div', function (done) {
      const wrapper = shallow(<Footer className='testing class'/>);
      expect(wrapper.find('.footer')).to.have.length(1);
      done();
    });
  });
});

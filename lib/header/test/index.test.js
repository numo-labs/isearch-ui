import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Header from '../';

describe('Component', function () {
  describe('<Header />', function () {
    it('Should render Header component', function (done) {
      const wrapper = shallow(<Header />);
      expect(wrapper.find('.headerBarWrapper')).to.have.length(1);
      done();
    });
  });
});

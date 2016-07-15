import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DatePicker from '../';

describe('Component', function () {
  const wrapper = shallow(<DatePicker />);
  const children = wrapper.children().nodes;
  describe('Date-Picker', function () {
    it('should render our date-picker component', function (done) {
      expect(children).to.have.length(3);
      done();
    });
  });
});

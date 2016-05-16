import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import DateInput from '../DateInput';

describe('lib/datepicker/dateInput.test.js > Component', function () {
  const wrapper = shallow(<DateInput />);
  const children = wrapper.children().nodes;
  describe('DateInput', function () {
    it('should render our DateInput component', function (done) {
      expect(children).to.have.length(0);
      done();
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Datepicker from '../Datepicker';

describe('lib/datepicker/index.test.js > Component', function () {
  const wrapper = shallow(<Datepicker />);
  const children = wrapper.children().nodes;
  describe('Datepicker', function () {
    it('should render our Datepicker  component', function (done) {
      expect(children).to.have.length(1);
      done();
    });
  });
});

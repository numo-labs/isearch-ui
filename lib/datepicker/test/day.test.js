import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Day from '../Day';

const props = {
  disabled: true,
  dayNextMonth: true,
  dayPrevMonth: true,
  selectDay: () => {},
  day: '2016-01-01',
  active: '2016-02-02',
  dayClassName: 'test',
  dayActiveClassName: 'test',
  dayDisabledClassName: 'test',
  dayFromOtherMonthClassName: 'test'
};

describe('Component', function () {
  const wrapper = shallow(<Day {...props}/>);
  const children = wrapper.children().nodes;
  describe('Day', function () {
    it('should render our Day component', function (done) {
      expect(children).to.have.length(1);
      done();
    });
  });
});

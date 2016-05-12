import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Calendar from '../Calendar';
import moment from 'moment';

const props = {
  date: moment('2016-01-01'),
  minDate: '2016-02-02',
  maxDate: '2016-03-03',
  calendarClassName: 'test',
  selectDay: () => {},
  monthClassName: 'test',
  prevMonthClassName: 'test',
  nextMonthClassName: 'test',
  dayClassName: 'test',
  dayActiveClassName: 'test',
  dayDisabledClassName: 'test',
  dayFromOtherMonthClassName: 'test'
};

describe('lib/datepicker/calendar.test.js > Component', function () {
  const wrapper = shallow(<Calendar {...props}/>);
  const children = wrapper.children().nodes;
  describe('Calendar', function () {
    it('should render our Calendar component', function (done) {
      expect(children).to.have.length(2);
      done();
    });
  });
});

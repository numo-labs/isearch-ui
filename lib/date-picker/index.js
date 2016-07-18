import React, { Component, PropTypes } from 'react';
import DatePicker from '../react-date-picker/Datepicker';
import moment from 'moment';
const calendarIcon = require('../../src/assets/calendar.svg');
import './styles.css';
class Calendar extends Component {
  render () {
    const {
      setValue
    } = this.props;
    return (
      <div className='datePickerContainer'>
        <img src={calendarIcon} alt='calendar' className='calendarIcon' />
        <div className='dateLabel'>{this.props.label}</div>
        <DatePicker
         inputClassName='datePickerInput'
         dayClassName='day'
         dayActiveClassName='dayActive'
         dayFromOtherMonthClassName='dayOtherMonth'
         className='departDate'
         ref={'datePicker'}
         date={this.props.date}
         clickOnDate={date => setValue(date.format('YYYY-MM-DD'))}
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  label: PropTypes.string,
  setValue: PropTypes.func,
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date)
  ])
};

export default Calendar;

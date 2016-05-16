import React, { Component, PropTypes } from 'react';
import DatePicker from '../datepicker/Datepicker';
import moment from 'moment';
import './styles.css';
class Calendar extends Component {
  render () {
    const {
      setValue
    } = this.props;
    return (
      <div className='datePickerContainer'>
        <div className='dateLabel'>{this.props.label}</div>
        <DatePicker
         inputClassName='datePickerInput'
         dayClassName='day'
         dayActiveClassName='dayActive'
         dayFromOtherMonthClassName='dayOtherMonth'
         className='departDate'
         ref={'datePicker'}
         date={this.props.date}
         clickOnDate={date => setValue((date._d).toString().split(' ')[2], (date._d).toString().split(' ')[1], (date._d).toString().split(' ')[3])}
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

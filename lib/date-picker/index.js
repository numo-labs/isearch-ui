
import React, { Component, PropTypes } from 'react';
import DatePicker from '../datepicker/Datepicker';
import moment from 'moment';
import './styles.css';
class Calendar extends Component {
  constructor () {
    super();
    this.state = {
      date: new Date()
    };
  }
  componentDidMount () {
    console.log('REFS', this.refs.datePicker.refs.dateInput.refs.dateInput.value);
  }
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
         clickOnDate={date => setValue((date._d).toString().split(' ')[2], (date._d).toString().split(' ')[1], (date._d).toString().split(' ')[3])}
        />
      </div>

    );
  }
}

Calendar.propTypes = {
  label: PropTypes.string,
  setValue: PropTypes.func
};

export default Calendar;

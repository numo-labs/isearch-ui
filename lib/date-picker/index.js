import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-simple-datepicker';
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
    return (
      <div className='datePickerContainer'>
        <div className='dateLabel'>{this.props.label}</div>
        <DatePicker
         date={this.state.date}
         inputClassName='datePickerInput'
         dayClassName='day'
         dayActiveClassName='dayActive'
         dayFromOtherMonthClassName='dayOtherMonth'
         className='departDate'
         ref={'datePicker'}
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

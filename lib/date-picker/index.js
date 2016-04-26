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
  handleClickOnDate (date, name) {
    let newDate = moment(date.format('YYY-MM-DD'));
    console.log('CLICKED', newDate);
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
         clickOnDate={this.handleClickOnDate.bind(this)}
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

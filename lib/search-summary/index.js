import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-simple-datepicker';
import DropDown from '../drop-down';
import 'react-simple-datepicker/dist/index.css';

require('./style.css');

export default class SearchSummary extends Component {
  constructor () {
    super();
    this.state = {
      active: false,
      date: new Date()
    };
  }
  toggle () {
    this.setState({
      active: !this.state.active
    });
  }
  render () {
    const stateStyle = this.state.active ? 'changeInputActive' : 'changeInputInactive';
    const blueContainerStyle = this.state.active ? 'blueContainerActive' : 'blueContainer';
    const header = this.state.active ? 'headerInactive' : 'headerActive';
    const options = ['1', '2', '3', '4'];
    return (
        <div className='searchSummaryContainer'>
          <div className={blueContainerStyle}>
            <div className={header}>
              <div className='weeksPaxMix'>
                <div className='weeks'>{this.props.durationInWeeks} week</div>
                <br/>
                <div className='paxMix'>{this.props.paxMix}</div>
              </div>
              <div className='changeButton' onClick={this.toggle.bind(this)}>CHANGE</div>
            </div>
            <div className='dropDown'>
              <div className={stateStyle}>
                <div className='exitButton' onClick={() => this.setState({active: false})}>X</div>
                <input placeholder='departing from' className='input departFrom'/>
                <row>
                  <DatePicker
                   date={this.state.date}
                   datepickerClassName='datePicker'
                   inputClassName='datePickerInput'
                   dayClassName='day'
                   dayActiveClassName='dayActive'
                   dayFromOtherMonthClassName='dayOtherMonth'
                   className='input departDate'
                  />
                  <input placeholder='weeks' className='input vacationLength'/>
                </row>
                <input placeholder='passengers e.g. 2 adults 2 children' className='input departFrom'/>
                <div className='changeInputButton'>Search</div>
                <div className='dropWrapper'>
                  <DropDown width={'95%'} label={'FLYING FROM'} options={options} />
                  <DropDown width={'95%'} label={'DURATION'} options={options} />
                  <DropDown width={'39%'} label={'DEPARTURE'} options={options} />
                  <DropDown width={'25%'} label={'ADULTS'} options={options} />
                  <DropDown width={'25%'} label={'KIDS'} options={options} />
                </div>
                </div>
            </div>
          </div>
        </div>
    );
  }
}

SearchSummary.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  durationInWeeks: PropTypes.number,
  paxMix: PropTypes.string,
  departureDate: PropTypes.string,
  returnDate: PropTypes.string
};

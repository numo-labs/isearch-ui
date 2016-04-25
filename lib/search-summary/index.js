import React, { Component, PropTypes } from 'react';
import DropDown from '../drop-down';
import Calendar from '../date-picker';
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
  moveScrollToTop (w = window) {
    w.scrollTo(0, 0);
  }
  toggle () {
    this.setState({
      active: !this.state.active
    });
  }
  handleOnClick () {
    this.toggle();
    this.moveScrollToTop(this.props.window);
  }
  render () {
    const stateStyle = this.state.active ? 'changeInputActive' : 'changeInputInactive';
    const blueContainerStyle = this.state.active ? 'blueContainerActive' : 'blueContainer';
    const header = this.state.active ? 'headerInactive' : 'headerActive';
    const adultOptions = [1, 2, 3, 4, 5, 6];
    const childOptions = [0, 1, 2, 3, 4];
    const departureOptions = [0, 1, 2, 3, 4];
    const durationOptions = ['1 week', '2 weeks', '3 weeks', '4 weeks'];
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
            <div className={`${stateStyle} dropDown`}>
              <div className='exitButton' onClick={this.handleOnClick.bind(this)}>X</div>
              <DropDown width={'95%'} label={'FLYING FROM'} options={departureOptions} />
              <DropDown width={'95%'} label={'DURATION'} options={durationOptions} />
              <div className='dropContainer departurePaxmix'>
                <Calendar className='departureCalendar' label={'DEPARTURE'}/>
                <DropDown width={'20%'} label={'ADULTS'} options={adultOptions} />
                <DropDown width={'20%'} label={'KIDS'} options={childOptions} />
              </div>
              <div className='changeInputButton'>Search</div>
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
  returnDate: PropTypes.string,
  window: PropTypes.object
};

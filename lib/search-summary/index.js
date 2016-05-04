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
  handleOnChangeInputButtonClick () {
    const {
      numberOfAdults,
      numberOfChildren,
      duration
    } = this.props;
    this.toggle();
    this.moveScrollToTop(this.props.window);
    this.props.setNumberOfAdultsTitle(numberOfAdults);
    this.props.setNumberOfChildrenTitle(numberOfChildren);
    this.props.setDurationTitle(duration);
    this.props.startSearch();
  }
  render () {
    const {
      numberOfChildren,
      numberOfAdults,
      setNumberOfChildren,
      childAge1,
      childAge2,
      childAge3,
      childAge4,
      setChildAge,
      setNumberOfAdults,
      setDepartureAirport,
      setDepartureDate,
      setDuration,
      numberOfAdultsTitle,
      numberOfChildrenTitle,
      durationTitle,
      departureAirport,
      duration
    } = this.props;
    const stateStyle = this.state.active ? 'changeInputActive' : 'changeInputInactive';
    const blueContainerStyle = this.state.active ? 'blueContainerActive' : 'blueContainer';
    const header = this.state.active ? 'headerInactive' : 'headerActive';
    const adultOptions = [1, 2, 3, 4, 5, 6];
    const childOptions = [0, 1, 2, 3, 4];
    const departureOptions = ['Copenhagen - CPH', 'Billund - BLL', 'Aalborg - AAL', 'Odense - ODE', 'Bornholm - RNN'];
    const durationOptions = ['1 week', '2 weeks', '3 weeks', '4 weeks'];
    const childAgeOptions = [
      '0 years',
      '1 year',
      '2 years',
      '3 years',
      '4 years',
      '5 years',
      '6 years',
      '7 years',
      '8 years',
      '9 years',
      '10 years',
      '11 years',
      '12 years',
      '13 years',
      '14 years',
      '15 years',
      '16 years',
      '17 years'
    ];
    const childAges = [childAge1, childAge2, childAge3, childAge4].slice(0, Number(numberOfChildren));
    return (
        <div className='searchSummaryContainer'>
          <div className={blueContainerStyle}>
            <div className={header}>
              <div className='weeksPaxMix'>
                <div className='weeks'>{durationTitle}</div>
                <br/>
                <div className='paxMix'>{numberOfAdultsTitle && numberOfChildrenTitle && durationTitle && numberOfAdultsTitle + ' adults, ' + numberOfChildrenTitle + ' kids'}</div>
              </div>
              <div className='changeButton' onClick={this.toggle.bind(this)}>CHANGE</div>
            </div>
            <div className={`${stateStyle} dropDown`}>
            <img src='../src/assets/close.svg' alt='exit button' className='exitButton' onClick={this.handleOnClick.bind(this)}/>
              <div className='contentHeader'>
                <img className='logoHeart' src='https://cloud.githubusercontent.com/assets/12450298/13631826/8a5cb062-e5de-11e5-8b73-f2ec9d622d5f.png' />
                <h1 className='spiesTitle'>SPIES</h1>
                <div className='inspirationTitle'>Inspiration</div>
              </div>
              <DropDown width={'95%'} label={'FLYING FROM'} setValue={setDepartureAirport} valueDefault={departureAirport} options={departureOptions} optionsTitle={'-'}/>
              <DropDown width={'95%'} label={'DURATION'} setValue={setDuration} valueDefault={duration} options={durationOptions} optionsTitle={'-'}/>
              <div className='dropContainer departurePaxmix'>
                <Calendar className='departureCalendar' label={'DEPARTURE'} setValue={setDepartureDate} optionsTitle={'-'}/>
                <DropDown width={'22.5%'} label={'ADULTS'} setValue={setNumberOfAdults} valueDefault={numberOfAdults} options={adultOptions} optionsTitle={'-'}/>
                <DropDown width={'22.5%'} label={'KIDS'} setValue={setNumberOfChildren} valueDefault={numberOfChildren} options={childOptions} optionsTitle={'-'}/>
              </div>
              {childAges.map((childAge, index) => {
                return (
                  <DropDown key={index} width={'46.5%'} label={'AGE'} setValue={setChildAge} valueDefault={childAge} childIndex={index} options={childAgeOptions} optionsTitle={'-'} />
                );
              })}
              <div className='changeInputButtonContainer'>
                <div className='changeInputButton' onClick={this.handleOnChangeInputButtonClick.bind(this)}>SEARCH</div>

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
  returnDate: PropTypes.string,
  window: PropTypes.object,
  childAge1: PropTypes.string,
  childAge2: PropTypes.string,
  childAge3: PropTypes.string,
  childAge4: PropTypes.string,
  setChildAge: PropTypes.func,
  numberOfChildren: PropTypes.string,
  numberOfAdults: PropTypes.string,
  setNumberOfChildren: PropTypes.func,
  setNumberOfAdults: PropTypes.func,
  setDepartureAirport: PropTypes.func,
  setDepartureDate: PropTypes.func,
  setDuration: PropTypes.func,
  duration: PropTypes.string,
  setNumberOfAdultsTitle: PropTypes.func,
  setNumberOfChildrenTitle: PropTypes.func,
  setDurationTitle: PropTypes.func,
  numberOfAdultsTitle: PropTypes.string,
  numberOfChildrenTitle: PropTypes.string,
  durationTitle: PropTypes.string,
  departureAirport: PropTypes.string,
  startSearch: PropTypes.func
};

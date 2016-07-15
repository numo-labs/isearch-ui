import React, { Component, PropTypes } from 'react';
import DropDown from '../../../lib/select-drop-down';
import Calendar from '../../../lib/date-picker';
import '../../../lib/react-date-picker/css/index.css';
import moment from 'moment';
import departOnFriday from '../../utils/departure-day-format';
const travelInfoExitButton = require('../../../src/assets/close-white.svg');
import goBackBrowserDetect from '../../utils/browser-detection';

import {
  adultOptions,
  childOptions,
  departureOptions,
  durationOptions,
  childAgeOptions
} from './options.js';
// const closeImage = require('../../../src/assets/close.svg');
import './style.css';
export default class EditDetails extends Component {
  onSearchClick () {
    const { go } = this.props;
    dataLayer.push({
      event: 'travelInfoUpdate'
    });
    this.props.updateHeaderTitles();
    this.props.startSearch();
    go(-1);
  }
  handleOnClick () {
    const { go } = this.props;
    goBackBrowserDetect(go);
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
      departureAirport,
      duration,
      departureDate,
      hideTravelInfo
    } = this.props;
    console.log('PROPS------', this.props);
    const childAges = [childAge1, childAge2, childAge3, childAge4].slice(0, Number(numberOfChildren));
    return (
      <div className='blueWrapper'>
        <div className='travelInfoOpacity'></div>
        <div className='blueContainer'>
          <div className={'changeDetailsContainer dropDown'}>
            <div className='travelInfoTitle'>Skift søgemuligheder</div>
            <div onClick={() => hideTravelInfo()}>
              <div>
                <img
                  src={travelInfoExitButton}
                  alt='exit button'
                  className='travelInfoExitButton'
                />
              </div>
            </div>
            <DropDown
              width={'95%'}
              label={'FRA'}
              setValue={setDepartureAirport}
              valueDefault={departureAirport}
              options={departureOptions}
              optionsTitle={'-'}
            />
            <DropDown
              width={'95%'}
              label={'REJSELÆNGDE'}
              setValue={setDuration}
              valueDefault={duration}
              options={durationOptions}
              optionsTitle={'-'}
            />
            <div className='dropContainer departurePaxmix'>
              <Calendar
                className='departureCalendar'
                label={'TIDLIGASTE AFREJSE'}
                setValue={setDepartureDate}
                optionsTitle={'-'}
                date={departureDate || departOnFriday(moment().add(3, 'months')).format('YYYY-MM-DD')}
              />
              <DropDown
                width={'22.5%'}
                label={'BØRN'}
                setValue={setNumberOfChildren}
                valueDefault={numberOfChildren}
                options={childOptions}
                optionsTitle={'-'}
              />
              <DropDown
                width={'22.5%'}
                label={'VOKSNE'}
                setValue={setNumberOfAdults}
                valueDefault={numberOfAdults}
                options={adultOptions}
                optionsTitle={'-'}
              />
            </div>
            {childAges.map((childAge, index) => {
              return (
                <DropDown
                  key={index}
                  width={'46.5%'}
                  label={'AGE'}
                  setValue={setChildAge}
                  valueDefault={childAge}
                  childIndex={index}
                  options={childAgeOptions}
                  optionsTitle={'-'}
                />
              );
            })}
            <div className='changeInputButtonContainer'>
              <div className='changeInputButton' onClick={this.onSearchClick.bind(this)}>Opdatér</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditDetails.propTypes = {
  departureDate: PropTypes.string,
  numberOfAdults: PropTypes.string,
  numberOfChildren: PropTypes.string,
  duration: PropTypes.string,
  startSearch: PropTypes.func,
  setNumberOfChildren: PropTypes.func,
  setNumberOfAdults: PropTypes.func,
  childAge1: PropTypes.string,
  childAge2: PropTypes.string,
  childAge3: PropTypes.string,
  childAge4: PropTypes.string,
  setChildAge: PropTypes.func,
  setDepartureAirport: PropTypes.func,
  setDepartureDate: PropTypes.func,
  setDuration: PropTypes.func,
  departureAirport: PropTypes.string,
  exitButtonClick: PropTypes.func,
  onSearchClick: PropTypes.func,
  go: PropTypes.func,
  updateHeaderTitles: PropTypes.func,
  hideTravelInfo: PropTypes.func
};

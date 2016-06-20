import React, { Component, PropTypes } from 'react';
import DropDown from '../../../lib/select-drop-down';
import Calendar from '../../../lib/date-picker';
import { Link } from 'react-router';
import '../../../lib/react-date-picker/css/index.css';
const travelInfoExitButton = require('../../../src/assets/close-white.svg');

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
    // if statement checks if the browser is safari
    // using go(-2) for safari instead of go(-1) because it hangs
    if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
      go(-2);
    } else {
      go(-1);
    }
  }
  handleOnClick () {
    const { go } = this.props;
    if (navigator.userAgent.indexOf('Chrome') !== -1) {
      go(-1);
    } else {
      go(-2);
    }
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
      departureDate
    } = this.props;
    const childAges = [childAge1, childAge2, childAge3, childAge4].slice(0, Number(numberOfChildren));
    return (
      <div className='blueContainer'>
        <div className={'changeDetailsContainer dropDown'}>
          <Link to='/' onClick={this.handleOnClick.bind(this)}>
            <div>
              <img
                src={travelInfoExitButton}
                alt='exit button'
                className='travelInfoExitButton'
              />
            </div>
          </Link>
          <div className='contentHeader'>
            <img className='logoHeart' src='https://cloud.githubusercontent.com/assets/12450298/13631826/8a5cb062-e5de-11e5-8b73-f2ec9d622d5f.png'/>
            <h1 className='spiesTitle'>SPIES</h1>
            <div className='inspirationTitle'>Inspiration</div>
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
              date={departureDate}
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
            <div className='changeInputButton' onClick={this.onSearchClick.bind(this)}>UPPDATERING</div>
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
  updateHeaderTitles: PropTypes.func
};

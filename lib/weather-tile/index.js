import React, { Component, PropTypes } from 'react';
import FadeImage from '../fade-image';
import { weatherIcon } from '../../src/constants/image-paths';
import './styles.css';

export default class WeatherTile extends Component {

  render () {
    const { weather, departureDate } = this.props;
    const month = (new Date(departureDate)).getMonth();
    const high = weather.high[month];
    const low = weather.low[month];
    const months = [
      'Januar',
      'Februar',
      'Marts',
      'April',
      'Maj',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'December'
    ];
    return (
      <div className='weatherTileContainer'>
        <FadeImage className='weatherImage' src={weather.image}/>
        <div className='descriptionContainer'>
          <div className='topContainer'>
            <div className='weatherTitle'>{weather.displayName}</div>
            <div className='weatherSubtitle'>Sædvanlige temperature i {months[month]}</div>
            <div className='weatherHeadline'><img src={weatherIcon} />{low}-{high}°C</div>
          </div>
        </div>
      </div>
    );
  }
}

WeatherTile.propTypes = {
  weather: PropTypes.object,
  departureDate: PropTypes.string
};

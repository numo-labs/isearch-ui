import React, { Component, PropTypes } from 'react';

require('./style.css');

export default class SearchSummary extends Component {
  render () {
    return (
      <div className='searchSummaryContainer'>
        <div className='search'>You searched for</div>
        <div className='blueContainer'>
        <h1>{this.props.city}<span className='lightText'>, {this.props.country}</span></h1>
        <div className='weekPax'>
          <div className='weeks'>{this.props.durationInWeeks} weeks</div>
          <div className='paxMix'>{this.props.paxMix}</div>
        </div>
        <div className='flights'>
          <img className='icon' src='https://cloud.githubusercontent.com/assets/12450298/13607069/738c44da-e546-11e5-80a7-a8a65692276c.png'/>
          <div className='departure'>{this.props.departureDate}</div>
          <img className='icon returnIcon' src='https://cloud.githubusercontent.com/assets/12450298/13607069/738c44da-e546-11e5-80a7-a8a65692276c.png'/>
          <div className='return'>{this.props.returnDate}</div>
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

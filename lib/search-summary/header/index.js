import React, { Component, PropTypes } from 'react';
import './style.css';
const postImage = require('../../../src/assets/goingplaces.svg');
export default class SearchSummaryHeader extends Component {
  render () {
    const { durationInWeeks, paxMix, changeRoute } = this.props;
    return (
      <div className='searchSummaryHeaderContainer'>
        <div className='weeksPaxMixContainer'>
          <div className='changeButton' onClick={() => changeRoute('/editDetails')}/>
          <div className='weeksPaxMix'>
            <div className='weeks'>{durationInWeeks}</div>
            <div className='paxMix'>{paxMix}</div>
          </div>
        </div>
        <div className='searchSummaryHeaderLogoContainer'>
          <img className='spiesLogo' src='https://cloud.githubusercontent.com/assets/12450298/13631826/8a5cb062-e5de-11e5-8b73-f2ec9d622d5f.png'/>
          <h1 className='spiesHeaderTitle'>SPIES</h1>
        </div>
        <img src={postImage} alt='edit tags' className='goingPlaces' onClick={() => changeRoute('/tagView')}/>
      </div>
    );
  }
}

SearchSummaryHeader.propTypes = {
  durationInWeeks: PropTypes.string,
  paxMix: PropTypes.string,
  changeDetails: PropTypes.func,
  viewTags: PropTypes.func,
  changeRoute: PropTypes.func
};

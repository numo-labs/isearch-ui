import React, { Component, PropTypes } from 'react';
import './style.css';
const postImage = require('../../../src/assets/goingplaces.svg');
export default class SearchSummaryHeader extends Component {
  render () {
    const { durationInWeeks, paxMix, changeRoute, showTravelInfo, editDetailsVisible } = this.props;
    return (
      <div>
        { !editDetailsVisible && <div className='searchSummaryHeaderContainer'>
          <div className='weeksPaxMixContainer'>
            <div className='changeButton' onClick={() => showTravelInfo()}/>
            <div className='weeksPaxMix'>
              <div className='weeks'>{durationInWeeks}</div>
              <div className='paxMix'>{paxMix}</div>
            </div>
          </div>
          <div className='searchSummaryHeaderLogoContainer'>
            <img className='spiesLogo' src='http://www.tcdl.io.s3-website-eu-west-1.amazonaws.com/isearch/images/spieslogo.png'/>
            <h1 className='spiesHeaderTitle'>SPIES</h1>
          </div>
          <img src={postImage} alt='edit tags' className='goingPlaces' onClick={() => changeRoute('/tagView')}/>
        </div>
        }
      </div>
    );
  }
}

SearchSummaryHeader.propTypes = {
  durationInWeeks: PropTypes.string,
  paxMix: PropTypes.string,
  changeDetails: PropTypes.func,
  viewTags: PropTypes.func,
  changeRoute: PropTypes.func,
  showTravelInfo: PropTypes.func,
  editDetailsVisible: PropTypes.bool
};

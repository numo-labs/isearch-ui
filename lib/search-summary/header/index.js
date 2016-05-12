import React, { Component, PropTypes } from 'react';
import './search-summary.style.css';
const postImage = require('../assets/goingplaces.svg');
export default class SearchSummaryHeader extends Component {
  render () {
    const { durationInWeeks, paxMix, changeDetails, viewTags } = this.props;
    return (
      <div className='blueContainer'>
        <div className='changeButton' onClick={changeDetails}>
        </div>
        <div className='weeksPaxMix'>
          <div className='weeks'>{durationInWeeks}</div>
          <div className='paxMix'>{paxMix}</div>
        </div>
        <img src={postImage} alt='edit tags' className='goingPlaces' onClick={viewTags}/>
      </div>
    );
  }
}

SearchSummaryHeader.propTypes = {
  durationInWeeks: PropTypes.string,
  paxMix: PropTypes.string,
  changeDetails: PropTypes.func,
  viewTags: PropTypes.func
};

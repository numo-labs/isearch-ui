import React, { Component, PropTypes } from 'react';
import './style.css';
import { animateScroll as scroll } from 'react-scroll';
export default class SearchSummaryHeader extends Component {
  render () {
    const { editDetailsVisible } = this.props;
    return (
      <div>
        { !editDetailsVisible && <div className='searchSummaryHeaderContainer'>
          <div className='searchSummaryHeaderLogoContainer'>
            <img className='spiesLogo' src='http://www.tcdl.io.s3-website-eu-west-1.amazonaws.com/isearch/images/spieslogo.png'/>
            <h1 className='spiesHeaderTitle'>SPIES</h1>
          </div>
          <div className='goUpButton' onClick={() => scroll.scrollToTop()}>Tilbage til søg</div>
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

import React, { Component, PropTypes } from 'react';
import './styles.css';
import FadeImage from '../fade-image';
import striptags from 'striptags';
import videoCameraIcon from '../../src/assets/video-camera.svg';
import mapIcon from '../../src/assets/map.svg';
import defaultImage from '../../src/constants/default-image';

class DestinationTile extends Component {

  rawMarkup (value) {
    return { __html: value };
  }

  render () {
    const { tile: { sections } } = this.props;
    const { image, title, text } = sections[0];
    let previewTextArray = text.trim()
                               .split('')
                               .slice(0, 292);

    const previewText = striptags(previewTextArray.join('').trim()) + '…';
    const imageSrc = image || defaultImage;
    return (
      <div className='destinationTileContainer'>
        <FadeImage className='destinationImage' src={imageSrc}/>
        <div className='destinationContentContainer'>
          <div className='titleDestHotelContainer'>
            <div className='destinationTitleContainer'>
              <div className='destinationTitle'>{title}</div>
            </div>
            <div className='destHotelContainer'>
              <div className='destHotelFigures'>20 / 183</div>
              <div className='destHotelTagContainer'>
                <div className='destTag'>Dest.</div>
                <div className='hotelsTag'>Hotels</div>
              </div>
            </div>
          </div>
          <div className='destinationDescription'>
            {previewText}
          </div>
          <div className='mapVideoIconContainer'>
            <div className='mapIconContainer'>
              <img src={mapIcon} alt='map' className='mapIcon' />
              <div className='mapIconText'>Vis på kort</div>
            </div>
            <div className='videoIconContainer'>
              <img src={videoCameraIcon} alt='videoCamera' className='videoIcon' />
              <div className='videoIconText'>Se film</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DestinationTile;

DestinationTile.propTypes = {
  tile: PropTypes.object
};

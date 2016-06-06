import React, { Component, PropTypes } from 'react';
import './styles.css';
const cameraIcon = require('../../src/assets/video-camera.svg');
const mapIcon = require('../../src/assets/map.svg');
class DestinationTile extends Component {

  rawMarkup (value) {
    return { __html: value };
  }

  render () {
    const { tile: { sections } } = this.props;
    const { image, title, text } = sections[0];
    return (
      <div>
        <div className='destinationImage' style={{backgroundImage: `url(${image})`}}>
        </div>
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
          <div className='destinationDescription' dangerouslySetInnerHTML={this.rawMarkup(text)}/>
            <div className='mapVideoIconContainer'>
            <div className='mapIconContainer'>
              <img src={mapIcon} alt='map' className='mapIcon' />
              <div className='mapIconText'>Visa på karta</div>
            </div>
            <div className='videoIconContainer'>
              <img src={cameraIcon} alt='video' className='videoIcon' />
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

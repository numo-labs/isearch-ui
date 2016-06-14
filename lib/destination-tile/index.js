import React, { Component, PropTypes } from 'react';
import './styles.css';
import FadeImage from '../fade-image';
import striptags from 'striptags';

const mapIcon = require('../../src/assets/map.svg');

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

    const previewText = striptags(previewTextArray.join('').trim()) + '…'; // close the string with a </div>
    return (
      <div className='destinationTileContainer'>
        <FadeImage className='destinationImage' src={image}/>
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
              <div className='mapIconText'>Visa på karta</div>
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

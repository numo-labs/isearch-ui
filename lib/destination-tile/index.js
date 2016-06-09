import React, { Component, PropTypes } from 'react';
import './styles.css';
const mapIcon = require('../../src/assets/map.svg');
class DestinationTile extends Component {

  rawMarkup (value) {
    return { __html: value };
  }

  render () {
    const { tile: { sections } } = this.props;
    const { image, title, text } = sections[0];
    let previewTextArray = text.split('').slice(0, 292);
    if (previewTextArray[previewTextArray.length - 1] === ' ') {
      previewTextArray = previewTextArray.slice(0, previewTextArray.length - 1);
    }
    const previewText = previewTextArray.slice(0, previewTextArray.length - 1).join('') + '...</div>';
    return (
      <div className='destinationTileContainer'>
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
          <div className='destinationDescription' dangerouslySetInnerHTML={this.rawMarkup(previewText)}/>
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

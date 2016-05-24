import React, { Component } from 'react';
import './styles.css';

class DestinationTile extends Component {
  render () {
    return (
      <div>
        <div className='destinationImage' style={{backgroundImage: `url(${'http://science-all.com/images/wallpapers/beach-images/beach-images-5.jpg'})`}}>
          <div className='contextBanner'>Great nightlife!</div>
        </div>
        <div className='destinationContentContainer'>
          <div className='titleDestHotelContainer'>
            <div className='destinationTitleContainer'>
              <div className='destinationTitle'>Mallorca</div>
            </div>
            <div className='destHotelContainer'>
              <div className='destHotelFigures'>20 / 183</div>
              <div className='destHotelTagContainer'>
                <div className='destTag'>Dest.</div>
                <div className='hotelsTag'>Hotels</div>
              </div>
            </div>
          </div>
          <div className='destinationDescription'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco...</div>
            <div className='mapVideoIconContainer'>
            <div className='mapIconContainer'>
              <img src='../../src/assets/map.svg' alt='map' className='mapIcon' />
              <div className='mapIconText'>Visa på karta</div>
            </div>
            <div className='videoIconContainer'>
              <img src='../../src/assets/video-camera.svg' alt='video' className='videoIcon' />
              <div className='videoIconText'>Se film</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DestinationTile;

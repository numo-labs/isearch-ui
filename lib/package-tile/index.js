import React, { PropTypes, Component } from 'react';

require('./style.css');

export default class PackageTile extends Component {
  render () {
    const { packageOffer } = this.props;
    return (
      <div className='packageContainer'>
        <div className='packageImage' style={{backgroundImage: `url(${packageOffer.hotel.images[0]['uri']})`}}>
          <div className='mintBar'>{packageOffer.provider.context}</div>
        </div>
        <div className='descriptionContainer'>
          <div className='topContainer'>
            <div className='packageTitle'>{packageOffer.hotel.name}</div>
            <div className='packageSubtitle'>
            {
                packageOffer.hotel.place.country + ', ' +
                packageOffer.hotel.place.region + ', ' +
                packageOffer.hotel.place.name
            }
            </div>
            <div className='heartsContainer'>{packageOffer.hotel.starRating}</div>
          </div>
          <div className='bottomContainer'>
            <div className='descriptionRow'>
            </div>
            <div className='descriptionRow'>
              <div className='date'>{packageOffer.flights.outbound[0].departure.localDateTime + packageOffer.nights}</div>
              <div className='price'>{`${packageOffer.price.perPerson}:-`}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PackageTile.propTypes = {
  packageOffer: PropTypes.object
};

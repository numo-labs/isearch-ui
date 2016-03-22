import React, { PropTypes, Component } from 'react';
import StarRating from './star-rating.js';
import { parseDate, constructUrl } from './helpers.js';

const defaultImage = 'http://oi43.tinypic.com/2s67n1i.jpg';

require('./style.css');

export default class PackageTile extends Component {
  render () {
    const { packageOffer } = this.props;
    const starRating = packageOffer.hotel.starRating;
    const roundedStarRating = Math.floor(starRating);
    let hotelImage = packageOffer.hotel.images.length ? packageOffer.hotel.images[0]['uri'] : defaultImage;
    let primaryImgSrc = constructUrl(hotelImage);
    return (
      <div className='packageContainer'>
        <div className='packageImage' style={{backgroundImage: `url(${primaryImgSrc})`}}>
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
            <div className='heartsContainer'>
              <StarRating starRating={roundedStarRating} />
            </div>
          </div>
          <div className='bottomContainer'>
            <div className='descriptionRow'>
            </div>
            <div className='nights'>{packageOffer.nights + ' nights'}</div>
            <div className='descriptionRow'>
              <div className='date'>{parseDate(packageOffer.flights.outbound[0].departure.localDateTime)}</div>
              <div className='price'>{`${packageOffer.price.perPerson},-`}</div>
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

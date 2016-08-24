import React, { PropTypes, Component } from 'react';
import StarRating from '../star-rating';
import { parseDate, constructUrl } from './helpers.js';
import FadeImage from '../fade-image';
import { defaultImage, ratingIcon } from '../../src/constants/image-paths';
require('./style.css');

export default class PackageTile extends Component {
  formatLocation () {
    const { packageOffer } = this.props;
    const country = packageOffer.hotel.place.country + ', ';
    const region = packageOffer.hotel.place.region === null || packageOffer.hotel.place.region === undefined ? '' : packageOffer.hotel.place.region + ', ';
    const name = packageOffer.hotel.place.name;
    return country + region + name;
  }

  formatFlightInfo () {
    const { packageOffer } = this.props;
    const outboundDate = packageOffer.flights.outbound[0] ? parseDate(packageOffer.flights.outbound[0].departure.localDateTime) : '';
    const returnDate = packageOffer.flights.inbound[0] ? parseDate(packageOffer.flights.inbound[0].departure.localDateTime) : '';
    return packageOffer.flights.outbound[0] ? (outboundDate + '  -  ' + returnDate) : 'date information currently unavailable';
  }

  formatDiscountPrice () {
    const { packageOffer: { price: { perPerson, discountPrice } } } = this.props;
    const oldPricePerPerson = (Number(perPerson) - Number(discountPrice));
    return (discountPrice && discountPrice !== '0') ? (oldPricePerPerson.toLocaleString('da-DK') + ',-') : '';
  }
  render () {
    const { packageOffer } = this.props;
    const roundedStarRating = Math.floor(packageOffer.hotel.starRating);
    const hotelImage = packageOffer.hotel.images.small.length ? packageOffer.hotel.images.small[0]['uri'] : defaultImage;
    const primaryImgSrc = constructUrl(hotelImage) || defaultImage;
    const label = packageOffer.hotel.concept.title;
    const labelStyle = packageOffer.hotel.concept.title !== '' ? 'labelVisible' : 'labelHidden';
    return (
      <div className='packageContainer'>
        <div className={labelStyle}>{label}</div>
        <FadeImage className='packageImage' src={primaryImgSrc}/>
        <div className='mintBar'>{packageOffer.provider.context}</div>
        <div className='descriptionContainer'>
          <div className='topContainer'>
            <div className='packageTitle'>{packageOffer.hotel.name}</div>
            <div className='packageSubtitle'>{this.formatLocation()}</div>
            <div className='heartsContainer'>
              <StarRating width={'1.5em'} height={'1.5em'} starRating={roundedStarRating} ratingIconUrl={ratingIcon}/>
            </div>
          </div>
          <div className='bottomContainer'>
            <div className='descriptionRow'>
              <div className='nights'>{packageOffer.nights + ' nætter'}</div>
              <div className='discountPrice'>{this.formatDiscountPrice()}</div>
            </div>
            <div className='descriptionRow'>
              <div className='date'>{this.formatFlightInfo()}</div>
              <div className='price'>{`${parseFloat(packageOffer.price.perPerson).toLocaleString('da-DK')},-`}</div>
              <div className='pricePerPerson'>Pr. person</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PackageTile.propTypes = {
  packageOffer: PropTypes.object,
  totalPassengers: PropTypes.number,
  itemId: PropTypes.string,
  removeTile: PropTypes.func,
  item: PropTypes.object
};

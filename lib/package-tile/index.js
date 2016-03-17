import React, { PropTypes, Component } from 'react';
import StarRating from './star-rating.js';

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
            <div className='heartsContainer'>
              <StarRating starRating={packageOffer.hotel.starRating} />
            </div>
          </div>
          <div className='bottomContainer'>
            <div className='descriptionRow'>
            </div>
            <div className='nights'>{packageOffer.nights + ' nights'}</div>
            <div className='descriptionRow'>
              <div className='date'>{parseDate(packageOffer.flights.outbound[0].departure.localDateTime)}</div>
              <div className='price'>{`${packageOffer.price.perPerson}:-`}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function parseDate (localDate) {
  const month = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const ms = Date.parse(localDate);

  let dd = new Date(ms).getDate();
  let mm = new Date(ms).getMonth();
  let yr = new Date(ms).getFullYear();

  if (dd < 10) dd = '0' + dd;

  return dd + ' ' + month[mm] + ' ' + yr;
}

PackageTile.propTypes = {
  packageOffer: PropTypes.object
};

import React, { PropTypes, Component } from 'react';
import StarRating from './star-rating.js';

const imgDomain = 'https://scdn3.thomascook.com/crop?maxWidth=400&maxHeight=0&imageUrl=http://cdn.thomascook.com';
const imgCropper = 'https://scdn3.thomascook.com/crop?maxWidth=400&maxHeight=0&imageUrl=';
const defaultImage = 'http://oi43.tinypic.com/2s67n1i.jpg';

require('./style.css');

export default class PackageTile extends Component {
  constructUrl (uri) {
    // If the url is a cropper service, just change the size
    if (uri.indexOf('/s.php?uid') > -1) {
      return uri;
    } else if (uri.startsWith('http')) {
      return imgCropper + uri;
    } else {
      return imgDomain + uri;
    }
  }
  render () {
    const { packageOffer } = this.props;
    const starRating = packageOffer.hotel.starRating;
    const roundedStarRating = Math.floor(starRating);
    let hotelImage = packageOffer.hotel.images.length ? packageOffer.hotel.images[0]['uri'] : defaultImage;
    let primaryImgSrc = this.constructUrl(hotelImage);
    console.log('rounded starRating', roundedStarRating);
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
              <StarRating starRating={roundedStarRating.toString()} />
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

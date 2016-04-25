import React, { PropTypes, Component } from 'react';
import StarRating from '../star-rating';
import { parseDate, constructUrl } from './helpers.js';

const defaultImage = 'http://oi43.tinypic.com/2s67n1i.jpg';
const ratingIconUrl = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAANCAYAAABPeYUaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMxQkIzNDAzRDk3NTExRTNBQ0U0ODE3RTMwQzlBRjRDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMxQkIzNDA0RDk3NTExRTNBQ0U0ODE3RTMwQzlBRjRDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzFCQjM0MDFEOTc1MTFFM0FDRTQ4MTdFMzBDOUFGNEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzFCQjM0MDJEOTc1MTFFM0FDRTQ4MTdFMzBDOUFGNEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4NUe2BAAAA6UlEQVR42mL8//8/A6WABUT8Oc8oAKQ2ALE9VPwgEAewGjF8gCn8NpMBqxrOtP8fmKACyJIMUPaB3+fAGmEGHMCiBqSPgQlJAB3ogzT+2MwgDzVAH4sae7h3cIK/DPr/XzOcBLLE8SmDueQhNsk/Nxje/P+N14CHcEP+vWdo+/8ZxQUMf+8wvPv/jUGEQMQUgAhGUBQzMjIyfF/EUMLwB4iZGH78/8PABzRIkIABiVzpDAvA+mGGQGMhAUjNJyJpgA0AMUD6mZBloBKJxBqAHrDEGoRhAFZD0Az6CBUC0YXYDIAHLKUAIMAAwKJVUpmB364AAAAASUVORK5CYII=`;

require('./style.css');

function moveScrollToTop (w = window) {
  w.scrollTo(0, 0);
}

export default class PackageTile extends Component {
  render () {
    const { packageOffer, viewHotel, setHotelPage } = this.props;
    const starRating = packageOffer.hotel.starRating;
    const roundedStarRating = Math.floor(starRating);
    const outboundDate = parseDate(packageOffer.flights.outbound[0].departure.localDateTime);
    const returnDate = parseDate(packageOffer.flights.inbound[0].departure.localDateTime);
    const country = packageOffer.hotel.place.country + ', ';
    const region = packageOffer.hotel.place.region === null ? '' : packageOffer.hotel.place.region + ', ';
    const name = packageOffer.hotel.place.name;
    let hotelImage = packageOffer.hotel.images.small.length ? packageOffer.hotel.images.small[0]['uri'] : defaultImage;
    let primaryImgSrc = constructUrl(hotelImage);
    return (
      <div
        onClick={() => {
          viewHotel();
          moveScrollToTop(this.props.window);
          setHotelPage(packageOffer);
        }}
        className='packageContainer'
      >
        <div className='packageImage' style={{backgroundImage: `url(${primaryImgSrc})`}}>
          <div className='mintBar'>{packageOffer.provider.context}</div>
        </div>
        <div className='descriptionContainer'>
          <div className='topContainer'>
            <div className='packageTitle'>{packageOffer.hotel.name}</div>
            <div className='packageSubtitle'>
            {
                country + region + name
            }
            </div>
            <div className='heartsContainer'>
              <StarRating starRating={roundedStarRating} ratingIconUrl={ratingIconUrl}/>
            </div>
          </div>
          <div className='bottomContainer'>
            <div className='descriptionRow'>
            </div>
            <div className='nights'>{packageOffer.nights + ' nights'}</div>
            <div className='descriptionRow'>
              <div className='date'>{outboundDate + ' > ' + returnDate}</div>
              <div className='price'>{`${packageOffer.price.perPerson},-`}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PackageTile.propTypes = {
  packageOffer: PropTypes.object,
  viewHotel: PropTypes.func,
  window: PropTypes.object,
  setHotelPage: PropTypes.func
};

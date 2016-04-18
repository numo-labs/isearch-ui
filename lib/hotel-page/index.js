import React, { Component, PropTypes } from 'react';
import StarRating from '../star-rating';
import { constructUrl } from './helpers.js';

const defaultImage = 'http://oi43.tinypic.com/2s67n1i.jpg';
const ratingIconUrl = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAANCAYAAABPeYUaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMxQkIzNDAzRDk3NTExRTNBQ0U0ODE3RTMwQzlBRjRDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMxQkIzNDA0RDk3NTExRTNBQ0U0ODE3RTMwQzlBRjRDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzFCQjM0MDFEOTc1MTFFM0FDRTQ4MTdFMzBDOUFGNEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzFCQjM0MDJEOTc1MTFFM0FDRTQ4MTdFMzBDOUFGNEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4NUe2BAAAA6UlEQVR42mL8//8/A6WABUT8Oc8oAKQ2ALE9VPwgEAewGjF8gCn8NpMBqxrOtP8fmKACyJIMUPaB3+fAGmEGHMCiBqSPgQlJAB3ogzT+2MwgDzVAH4sae7h3cIK/DPr/XzOcBLLE8SmDueQhNsk/Nxje/P+N14CHcEP+vWdo+/8ZxQUMf+8wvPv/jUGEQMQUgAhGUBQzMjIyfF/EUMLwB4iZGH78/8PABzRIkIABiVzpDAvA+mGGQGMhAUjNJyJpgA0AMUD6mZBloBKJxBqAHrDEGoRhAFZD0Az6CBUC0YXYDIAHLKUAIMAAwKJVUpmB364AAAAASUVORK5CYII=`;

class HotelPage extends Component {
  renderAmenities (amenities) {
    const amenitiesToRender = amenities.map((amenity, index) => {
      return (
          <div>
            <img src='https://cloud.githubusercontent.com/assets/12450298/14609757/185d69a6-0583-11e6-8ea9-6d0ee13b31ac.png'/>
            <div>{amenity}</div>
          </div>
        );
    });
    return amenitiesToRender;
  }
  render () {
    const { packageOffer } = this.props;
    const amenitiesSetOne = packageOffer.amenities.slice(0, 3);
    const amenitiesSetTwo = packageOffer.amenities.slice(3, 6);
    const starRating = packageOffer.hotel.starRating;
    const roundedStarRating = Math.floor(starRating);
    let hotelImage = packageOffer.hotel.images.length ? packageOffer.hotel.images[0]['uri'] : defaultImage;
    let primaryImgSrc = constructUrl(hotelImage);
    return (
      <div>
        <div>
          <img src='https://cloud.githubusercontent.com/assets/12450298/14609647/b8352942-0582-11e6-8da2-978661840c54.png'/>
          <div>SHARE</div>
        </div>
        <div>
          <div className='packageImage' style={{backgroundImage: `url(${primaryImgSrc})`}}>
          </div>
        </div>
        <div>
          <img src='https://cloud.githubusercontent.com/assets/12450298/14609563/3e0af0b6-0582-11e6-9668-d15a38cdea14.png'/>
          <a className='packageTitle' href='http://spiesdk.acctest.int/?utm_source=inspriational_search'>{packageOffer.hotel.name}</a>
          <div className='packageSubtitle'>
          {
              packageOffer.hotel.place.country + ', ' +
              packageOffer.hotel.place.region + ', ' +
              packageOffer.hotel.place.name
          }
          </div>
          <StarRating starRating={roundedStarRating} ratingIconUrl={ratingIconUrl}/>
          <div>
            {this.renderEvenAmenities(amenitiesSetOne)}
            {this.renderOddAmenities(amenitiesSetTwo)}
          </div>
        </div>
      </div>
    );
  }
}

HotelPage.propTypes = {
  packageOffer: PropTypes.object
};

export default HotelPage;

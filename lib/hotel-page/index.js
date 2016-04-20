import React, { Component, PropTypes } from 'react';
import StarRating from '../star-rating';
import NavHeader from '../nav-header';
import { constructUrl } from './helpers.js';
import './styles.css';

const defaultImage = 'http://oi43.tinypic.com/2s67n1i.jpg';
const ratingIconUrl = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAANCAYAAABPeYUaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMxQkIzNDAzRDk3NTExRTNBQ0U0ODE3RTMwQzlBRjRDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMxQkIzNDA0RDk3NTExRTNBQ0U0ODE3RTMwQzlBRjRDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzFCQjM0MDFEOTc1MTFFM0FDRTQ4MTdFMzBDOUFGNEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzFCQjM0MDJEOTc1MTFFM0FDRTQ4MTdFMzBDOUFGNEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4NUe2BAAAA6UlEQVR42mL8//8/A6WABUT8Oc8oAKQ2ALE9VPwgEAewGjF8gCn8NpMBqxrOtP8fmKACyJIMUPaB3+fAGmEGHMCiBqSPgQlJAB3ogzT+2MwgDzVAH4sae7h3cIK/DPr/XzOcBLLE8SmDueQhNsk/Nxje/P+N14CHcEP+vWdo+/8ZxQUMf+8wvPv/jUGEQMQUgAhGUBQzMjIyfF/EUMLwB4iZGH78/8PABzRIkIABiVzpDAvA+mGGQGMhAUjNJyJpgA0AMUD6mZBloBKJxBqAHrDEGoRhAFZD0Az6CBUC0YXYDIAHLKUAIMAAwKJVUpmB364AAAAASUVORK5CYII=`;

class HotelPage extends Component {
  renderAmenities (amenities) {
    const amenitiesToRender = amenities.map((amenity, index) => {
      return (
          <div className='tickAmenity'>
            <img className='tick' src='https://cloud.githubusercontent.com/assets/12450298/14638007/012521c0-062d-11e6-9e7b-34aded598a3f.png'/>
            <div className='amenity'>{amenity}</div>
          </div>
        );
    });
    return amenitiesToRender;
  }
  render () {
    const { packageOffer } = this.props;
    const amenitiesOne = Object.keys(packageOffer.amenities).slice(0, 3);
    const amenitiesTwo = Object.keys(packageOffer.amenities).slice(3, 6);
    const starRating = packageOffer.hotel.starRating;
    const roundedStarRating = Math.floor(starRating);
    let hotelImage = packageOffer.hotel.images.length ? packageOffer.hotel.images[8]['uri'] : defaultImage;
    let primaryImgSrc = constructUrl(hotelImage);
    return (
      <div>
        <NavHeader />
        <div className='imageContainer'>
          <div className='packageImage' style={{backgroundImage: `url(${primaryImgSrc})`}}>
            <div className='mintBanner'>{packageOffer.flights.inbound[0].departure.airportname}</div>
          </div>
        </div>
        <div className='infoContainer'>
          <div className='heartShareContainer'>
            <img className='heartShare' src='https://cloud.githubusercontent.com/assets/12450298/14609563/3e0af0b6-0582-11e6-9668-d15a38cdea14.png'/>
          </div>
          <div className='infoContentContainer'>
          <a className='titlePackage' href='http://spiesdk.acctest.int/?utm_source=inspriational_search'>{packageOffer.hotel.name}</a>
          <div className='subtitlePackage'>
          {
              packageOffer.hotel.place.country + ', ' +
              packageOffer.hotel.place.region + ', ' +
              packageOffer.hotel.place.name
          }
          </div>
          <div className='heartRatingContainer'>
            <StarRating starRating={roundedStarRating} ratingIconUrl={ratingIconUrl} size={1.8} width={1.8}/>
          </div>
            <div className='amenityBlock'>
              <div className='amenityWrapper'>
                <div className='amenityContainer'>
                  {this.renderAmenities(amenitiesOne)}
                </div>
                <div className='amenityContainer'>
                  {this.renderAmenities(amenitiesTwo)}
                </div>
                <div className='more'>+ more</div>
              </div>
            </div>
            <div className='descriptionWrapper'>
              <div className='textVisible'>
                {packageOffer.description}
              </div>
            </div>
            <div className='bookButtonContainer'>
              <div className='bookButton'>BOOK</div>
            </div>
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

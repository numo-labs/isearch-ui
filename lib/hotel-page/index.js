import React, { Component, PropTypes } from 'react';
import StarRating from '../star-rating';
import NavHeader from '../nav-header';
import { constructUrl } from './helpers.js';
import './styles.css';

import Slider from 'react-slick';

const defaultImage = 'http://oi43.tinypic.com/2s67n1i.jpg';
const ratingIconUrl = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAANCAYAAABPeYUaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMxQkIzNDAzRDk3NTExRTNBQ0U0ODE3RTMwQzlBRjRDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMxQkIzNDA0RDk3NTExRTNBQ0U0ODE3RTMwQzlBRjRDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzFCQjM0MDFEOTc1MTFFM0FDRTQ4MTdFMzBDOUFGNEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzFCQjM0MDJEOTc1MTFFM0FDRTQ4MTdFMzBDOUFGNEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4NUe2BAAAA6UlEQVR42mL8//8/A6WABUT8Oc8oAKQ2ALE9VPwgEAewGjF8gCn8NpMBqxrOtP8fmKACyJIMUPaB3+fAGmEGHMCiBqSPgQlJAB3ogzT+2MwgDzVAH4sae7h3cIK/DPr/XzOcBLLE8SmDueQhNsk/Nxje/P+N14CHcEP+vWdo+/8ZxQUMf+8wvPv/jUGEQMQUgAhGUBQzMjIyfF/EUMLwB4iZGH78/8PABzRIkIABiVzpDAvA+mGGQGMhAUjNJyJpgA0AMUD6mZBloBKJxBqAHrDEGoRhAFZD0Az6CBUC0YXYDIAHLKUAIMAAwKJVUpmB364AAAAASUVORK5CYII=`;

const hotelImages = [
  'http://images1.spies.dk/images/Hotel/AYTCORD1025_1_13.jpg?v=2',
  // 'http://oi43.tinypic.com/2s67n1i.jpg',
  'http://images1.spies.dk/images/Hotel/LCAPANA1019_1_13.jpg?v=25',
  'http://images1.spies.dk/images/Hotel/TFSVIRG1033_1_13.jpg?v=1'
];

class HotelPage extends Component {
  renderFact (fact) {
    const { packageOffer } = this.props;
    const amenitiesObject = packageOffer.amenities;
    for (var key in amenitiesObject) {
      if (!amenitiesObject.hasOwnProperty(key)) continue;
      if (key === fact) {
        return amenitiesObject[key].split(' ')[0];
      }
    }
  }
  retrieveAmenities () {
    const { packageOffer } = this.props;
    const amenitiesObject = packageOffer.amenities;
    const amenitiesArray = [];
    for (var key in amenitiesObject) {
      if (!amenitiesObject.hasOwnProperty(key)) continue;
      if (amenitiesObject[key] === true) {
        amenitiesArray.push(key);
      }
    }
    return amenitiesArray;
  }
  renderAmenities (amenities) {
    const amenitiesToRender = amenities.map((amenity, index) => {
      return (
          <div key={index} className='tickAmenity'>
            <img className='tick' src='https://cloud.githubusercontent.com/assets/12450298/14638007/012521c0-062d-11e6-9e7b-34aded598a3f.png'/>
            <div className='amenity'>{amenity}</div>
          </div>
        );
    });
    return amenitiesToRender;
  }
  renderFactlist () {
    return (
      <div className='factHolder'>
        <div className='factWrapper'>
          <div className='factHeading'>Hotel Facts</div>
          <div className='factContainer'>
            <div className='factTitles'>
              <div>Distance to beach</div>
              <div>Distance to city center</div>
              <div>Outdoor pools</div>
            </div>
            <div className='factValues'>
              <div>{this.renderFact('distancetobeach')}m</div>
              <div>{this.renderFact('distancetocenter')}m</div>
              <div>{this.renderFact('outdoorpool')}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render () {
    const { packageOffer, backToSearch } = this.props;
    const amenitiesOne = this.retrieveAmenities().slice(0, 3);
    const amenitiesTwo = this.retrieveAmenities().slice(3, 6);
    const starRating = packageOffer.hotel.starRating;
    const roundedStarRating = Math.floor(starRating);
    let hotelImage = packageOffer.hotel.images.length ? packageOffer.hotel.images[8]['uri'] : defaultImage;
    let primaryImgSrc = constructUrl(hotelImage);

    var sliderSettings = {
      arrows: true,
      useCSS: true
    };
    return (
      <div className='hotelPageContainer'>
        <NavHeader backToSearch={backToSearch} />
        <div className='hotelPackageImage' style={{backgroundImage: `url(${primaryImgSrc})`}}/>
        <Slider className='headerSlider' {...sliderSettings}>
          {hotelImages.map((image, key) => {
            return (
              <div key={key} className='sliderImage' style={{backgroundImage: `url(${constructUrl(image)})`}}>
                <img src={constructUrl(image)}/>
              </div>
            );
          })}
        </Slider>
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
              <div className='textWrapper'>
                <div className='textVisible'>
                  {packageOffer.description}
                </div>
              </div>
              {this.renderFactlist()}
            </div>
            <div className='bookButtonContainer'>
              <div className='ppp'>ppp <span className='hotelPrice'>{packageOffer.price.perPerson}:-</span></div>
              <div className='bookButton'>BOOK</div>
            </div>
            <Slider className='descriptionSlider' {...sliderSettings}>
              {hotelImages.map((image, key) => {
                return (
                  <div key={key} className='sliderImage' style={{backgroundImage: `url(${constructUrl(image)})`}}>
                    <img src={constructUrl(image)}/>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

/*
<div className='imageContainer'>
  <div className='packageImage' style={{backgroundImage: `url(${primaryImgSrc})`}}>
    <div className='mintBanner'>{packageOffer.flights.inbound[0].departure.airportname}</div>
  </div>
</div>
 */

HotelPage.propTypes = {
  packageOffer: PropTypes.object,
  backToSearch: PropTypes.func
};

export default HotelPage;

import React, { Component, PropTypes } from 'react';
import StarRating from '../../../lib/star-rating';
import NavHeader from '../../../lib/nav-header';
import _ from 'lodash';
import './styles.css';

import ISearchSlider from '../../../lib/image-slider';
import LoadingSpinner from '../../../lib/spinner';

const ratingIconUrl = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAANCAYAAABPeYUaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMxQkIzNDAzRDk3NTExRTNBQ0U0ODE3RTMwQzlBRjRDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMxQkIzNDA0RDk3NTExRTNBQ0U0ODE3RTMwQzlBRjRDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzFCQjM0MDFEOTc1MTFFM0FDRTQ4MTdFMzBDOUFGNEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzFCQjM0MDJEOTc1MTFFM0FDRTQ4MTdFMzBDOUFGNEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4NUe2BAAAA6UlEQVR42mL8//8/A6WABUT8Oc8oAKQ2ALE9VPwgEAewGjF8gCn8NpMBqxrOtP8fmKACyJIMUPaB3+fAGmEGHMCiBqSPgQlJAB3ogzT+2MwgDzVAH4sae7h3cIK/DPr/XzOcBLLE8SmDueQhNsk/Nxje/P+N14CHcEP+vWdo+/8ZxQUMf+8wvPv/jUGEQMQUgAhGUBQzMjIyfF/EUMLwB4iZGH78/8PABzRIkIABiVzpDAvA+mGGQGMhAUjNJyJpgA0AMUD6mZBloBKJxBqAHrDEGoRhAFZD0Az6CBUC0YXYDIAHLKUAIMAAwKJVUpmB364AAAAASUVORK5CYII=`;
const heartShareSrc = 'https://cloud.githubusercontent.com/assets/12450298/14609563/3e0af0b6-0582-11e6-9668-d15a38cdea14.png';

class HotelPage extends Component {
  constructor () {
    super();
    this.getHotelData = this.getHotelData.bind(this);
    this.renderHotelPage = this.renderHotelPage.bind(this);
  }

  componentWillMount () {
    this.getHotelData();
  }

  getHotelData () {
    this.props.getHotel(this.props.params.userId, this.props.params.bucketId, this.props.params.itemId);
  }
  renderFact (fact) {
    const { packageOffer } = this.props;
    const amenitiesObject = packageOffer.amenities;
    for (var key in amenitiesObject) {
      if (!amenitiesObject.hasOwnProperty(key)) continue;
      if (key === fact) {
        if (amenitiesObject[key] === typeof boolean || amenitiesObject[key] === 'true' || amenitiesObject[key] === 'false') {
          return '-';
        } else if (amenitiesObject[key].split(' ')[1] === 'km') {
          return amenitiesObject[key].split(' ')[0] + 'k';
        } else {
          return amenitiesObject[key].split(' ')[0];
        }
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
      if (amenity === 'minimarket') {
        amenity = 'minimarked';
      }
      if (amenity === 'childrenpool') {
        amenity = 'børnepool';
      }
      return (
        <div key={index} className='tickAmenity'>
          <div className='amenity'>{_.capitalize(amenity)}</div>
        </div>
      );
    });
    return amenitiesToRender;
  }
  renderFactlist (amenities) {
    return (
      <div className='factHolder'>
        <div className='factWrapper'>
          <div className='factHeading'>Hotelfakta</div>
          <div className='factContainer'>
            <div className='factTitles'>
              <div>Strand</div>
              <div>Lokalt centrum</div>
              <div>Pool</div>
              {this.renderAmenities(amenities)}
            </div>
            <div className='factValues'>
              <div>{this.renderFact('distancetobeach')}m</div>
              <div>{this.renderFact('distancetocenter')}m</div>
              <div>{this.renderFact('outdoorpool')}</div>
              { amenities.map((a, idx) => { return (<div key={idx}>Ja</div>); }) }
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderImageList (images) {
    return images.map((image, idx) => {
      return (
        <img key={idx} src={image}/>
      );
    });
  }
  renderHotelPage () {
    const { packageOffer, goBack } = this.props;
    const hotelImages = packageOffer.hotel.images.large.map(i => i.uri);
    const roundedStarRating = Math.floor(packageOffer.hotel.starRating);
    const image = hotelImages[0];
    const country = packageOffer.hotel.place.country + ', ';
    const region = packageOffer.hotel.place.region === null ? '' : packageOffer.hotel.place.region + ', ';
    const name = packageOffer.hotel.place.name;

    return ([
      <NavHeader backToSearch={goBack} />,
      <div className='hotelPackageImage' style={{backgroundImage: `url(${image})`}}/>,
      <ISearchSlider images={hotelImages} className='headerSlider'/>,
      <div className='infoContainer'>
        <div className='heartShareContainer'>
          <img className='heartShare' src={heartShareSrc}/>
        </div>
        <div className='infoContentContainer'>
          <div className='titleHeartContainer'>
            <div className='titlePackage'>
              {packageOffer.hotel.name}
            </div>
            <div className='subtitlePackage'>
              {country + region + name}
            </div>
            <div className='heartRatingContainer'>
              <StarRating
                starRating={roundedStarRating}
                ratingIconUrl={ratingIconUrl}
                size={1.8}
                width={1.8}
              />
            </div>
          </div>
          <div className='descriptionWrapper'>
            <div className='textWrapper'>
              <div className='textVisible'>
                {packageOffer.hotel.description}
              </div>
            </div>
            {this.renderFactlist(this.retrieveAmenities())}
          </div>
          <div className='bookButtonContainer'>
            <div className='ppp'>ppp <span className='hotelPrice'>
              {parseFloat(packageOffer.price.perPerson).toLocaleString('da-DK')},-
            </span></div>
            <a href={packageOffer.provider.deepLink}>
              <div className='bookButton'>SEE PRIS OCH BOKA</div>
            </a>
          </div>
          <div className='hotelImagesContainer'>
            <h2 className='imagesHeading'>Billeder</h2>
            {this.renderImageList(hotelImages.slice(1))}
          </div>
          <div className='bookButtonFooter'>
            <a href={packageOffer.provider.deepLink}>
              <div className='hotelInfoLink'>Se fuld information hotel og bog</div>
              <div className='bookButton'>SEE PRIS OCH BOKA</div>
            </a>
          </div>
        </div>
      </div>
    ]);
  }

  render () {
    const { packageOffer } = this.props;
    if (packageOffer.hotel.description) {
      return (
        <div className='hotelPageContainer'>
          {this.renderHotelPage()}
        </div>
      );
    } else {
      return <LoadingSpinner />;
    }
  }
}

HotelPage.propTypes = {
  goBack: PropTypes.func,
  getHotel: PropTypes.func,
  params: PropTypes.object,
  packageOffer: PropTypes.object
};

export default HotelPage;

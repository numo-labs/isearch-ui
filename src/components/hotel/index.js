import React, { Component, PropTypes } from 'react';
import StarRating from '../../../lib/star-rating';
import NavHeader from '../../../lib/nav-header';
import capitalize from 'lodash.capitalize';
import FadeImage from '../../../lib/fade-image';
import './styles.css';

import ISearchSlider from '../../../lib/image-slider';

const heartShareSrc = 'https://cloud.githubusercontent.com/assets/12450298/14609563/3e0af0b6-0582-11e6-9668-d15a38cdea14.png';

import { analyticsAddToCart } from '../../../lib/analytics-helper';

import { ratingIcon } from '../../constants/image-paths';

const analyticsReferer = '&landingfrom=inspirational_search';

class HotelPage extends Component {
  constructor () {
    super();
    this.getHotelData = this.getHotelData.bind(this);
    this.renderHotelPage = this.renderHotelPage.bind(this);
    this.registerAnalyticsClick = this.registerAnalyticsClick.bind(this);
  }

  componentWillMount () {
    this.getHotelData();
  }

  addAnalyticsData () {
    if (dataLayer) {
      dataLayer.push({
        'event': 'productViewed',
        'pageName': '/hotel/' + this.props.packageOffer.hotel.name.replace(/ /g, '-'),
        'ecommerce': {
          'detail': {
            'actionField': {'list': 'inspirational search feed'},
            'products': [{
              'id': this.props.packageOffer.provider.reference,
              'brand': 'hotel_tile',
              'dimension11': this.props.packageOffer.destinationCode,
              'dimension12': this.props.packageOffer.destinationName,
              'dimension13': this.props.packageOffer.departureCode
            }]
          }
        }
      });
    }
  }

  registerAnalyticsClick () {
    dataLayer.push(analyticsAddToCart(this.props.packageOffer));
  }

  getHotelData () {
    this.props.getHotel(this.props.params.bucketId, this.props.params.itemId);
  }
  renderFact (fact) {
    const { packageOffer } = this.props;
    const amenitiesObject = packageOffer.amenities;
    for (var key in amenitiesObject) {
      if (!amenitiesObject.hasOwnProperty(key)) continue;
      if (key === fact) {
        if (typeof amenitiesObject[key] !== 'string' && amenitiesObject[key] !== true && amenitiesObject[key] !== false) {
          return '-';
        } else if (amenitiesObject[key] === false) {
          return 'Nej';
        } else if (amenitiesObject[key] === true) {
          return 'Ja';
        } else if (amenitiesObject[ key ].split(' ')[ 1 ] === 'km') {
          return amenitiesObject[ key ].split(' ')[ 0 ] + 'k';
        } else {
          return amenitiesObject[ key ].split(' ')[ 0 ];
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
      if (amenitiesObject[ key ] === true) {
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
        <div key={index} className='factPair'>
          <div className='fact'>{capitalize(amenity)}</div>
          <div className='value'>Ja</div>
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
            <div className='factPair'>
              <div className='fact'>Lokalt centrum</div>
              <div className='value'>{this.renderFact('distancetocenter')}m</div>
            </div>
            <div>
            <div className='factPair'>
              <div className='fact'>Pool</div>
              <div className='value'>{this.renderFact('outdoorpool')}</div>
            </div>
            </div>
              {this.renderAmenities(amenities)}
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

  renderHotelPage (props) {
    const { packageOffer, goBack, go } = props;
    const hotelImages = packageOffer.hotel.images.large.map(i => i.uri);
    const roundedStarRating = Math.floor(packageOffer.hotel.starRating);
    const image = hotelImages[ 0 ];
    const country = packageOffer.hotel.place.country + ', ';
    const region = packageOffer.hotel.place.region ? packageOffer.hotel.place.region + ', ' : '';
    const name = packageOffer.hotel.place.name;

    if (document.querySelector('title')) document.querySelector('title').innerHTML = packageOffer.hotel.name;
    return ([
      <NavHeader backToSearch={goBack} go={go}/>,
      <FadeImage isBackground={Boolean(true)} className='hotelPackageImage' src={image} />,
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
                ratingIconUrl={ratingIcon}
                size={1.8}
                width={'1.7em'}
                height={'1.7em'}
              />
            </div>
          </div>
          <div className='descriptionWrapper'>
            <div className='textWrapper'>
              <div className='textVisible'>
                {packageOffer.hotel.description}
              </div>
            </div>
            <div className='factListWrapper'>
              {this.renderFactlist(this.retrieveAmenities())}
            </div>
          </div>
          <div className='bookButtonContainer'>
            <span className='hotelPrice1'>
              {parseFloat(packageOffer.price.perPerson).toLocaleString('da-DK')},-
            </span>
            <div className='ppp1'>Pr. person</div>
            <a href={packageOffer.provider.deepLink + analyticsReferer} onClick={this.registerAnalyticsClick}>
              <div className='bookButton1'>SE PRIS OG BESTIL</div>
            </a>
          </div>
          <div className='hotelImagesContainer'>
            {hotelImages.length > 1 && <h2 className='imagesHeading'>Billeder</h2>}
            {this.renderImageList(hotelImages.slice(1))}
          </div>
          <div className='bookButtonFooter'>
            <span className='hotelPrice2'>
              {parseFloat(packageOffer.price.perPerson).toLocaleString('da-DK')},-
            </span>
            <div className='ppp2'>Pr. person</div>
            <a href={packageOffer.provider.deepLink + analyticsReferer} onClick={this.registerAnalyticsClick}>
              <div className='bookButton2'>SE PRIS OG BESTIL</div>
            </a>
          </div>
        </div>
      </div>
    ]);
  }

  render () {
    const { packageOffer } = this.props;
    const defaultPackage = {
      goBack: this.props.goBack,
      packageOffer: defaultProps.packageOffer
    };
    if (packageOffer.hotel.description) {
      this.addAnalyticsData();
      return (
        <div className='hotelPageContainer'>
          {this.renderHotelPage(this.props)}
        </div>
      );
    } else {
      return (
        <div className='hotelPageContainer'>
          {this.renderHotelPage(defaultPackage)}
        </div>
      );
    }
  }
}

HotelPage.propTypes = {
  goBack: PropTypes.func,
  getHotel: PropTypes.func,
  params: PropTypes.object,
  packageOffer: PropTypes.object
};

const defaultProps = {
  packageOffer: {
    hotel: {
      starRating: 0,
      images: {
        small: [
          {
            uri: ''
          }
        ],
        large: [
          {
            uri: ''
          }
        ]
      },
      name: '',
      description: '',
      place: {
        country: '',
        region: '',
        name: ''
      }
    },
    provider: {
      context: ''
    },
    nights: 5,
    flights: {
      outbound: [ {
        departure: {
          localDateTime: ''
        }
      } ],
      inbound: [ {
        departure: {
          localDateTime: ''
        }
      } ]
    },
    price: {
      perPerson: ''
    },
    amenities: {
      allinclusive: false,
      bar: true,
      childrenpool: true,
      cleaningdaysperweek: '6',
      distancetobeach: '300 m',
      distancetocenter: '200 m',
      elevator: true,
      isadulthotel: false,
      lolloandbernie: false,
      minimarket: false,
      outdoorpool: '2 stk.',
      poolbar: true,
      restaurant: true,
      waterslide: false,
      wifi: true
    }
  },
  params: {
    bucketId: '12345',
    itemId: '1234556'
  },
  getHotel: () => {}
};

export default HotelPage;

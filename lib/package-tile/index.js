import React, { PropTypes, Component } from 'react';

require('./style.css');

export default class PackageTile extends Component {
  render () {
    const {
      imageSrc,
      caption,
      title,
      subtitle,
      numHearts,
      rating,
      packageDetails,
      oldPrice,
      period,
      newPrice
    } = this.props;

    const hearts = Array(numHearts).fill(1).map((el, i) => {
      return (
        <img
          className='heart'
          key={i}src='http://marcommnews.com/wp-content/uploads/2013/10/heart_482.jpg'
        />
      );
    });

    return (
      <div className='packageContainer'>
        <div className='packageImage' style={{backgroundImage: `url(${imageSrc})`}}>
          <div className='mintBar'>{caption}</div>
        </div>
        <div className='descriptionContainer'>
          <div className='topContainer'>
            <div className='packageTitle'>{title}</div>
            <div className='packageSubtitle'>{subtitle}</div>
            <div className='heartsContainer'>{hearts}</div>
            <div className='ratingNumerator'>{rating.split('/')[0]}</div>
            <div className='ratingDenominator'>{'/' + rating.split('/')[1]}</div>
          </div>
          <div className='bottomContainer'>
            <div className='descriptionRow'>
              <div className='packageDetailsText'>{`✔ ${packageDetails}`}</div>
              <div className='strikethroughText'>{oldPrice}</div>
            </div>
            <div className='descriptionRow'>
              <div className='date'>{period}</div>
              <div className='price'>{`${newPrice}:-`}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PackageTile.propTypes = {
  imageSrc: PropTypes.string,
  caption: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  numHearts: PropTypes.number,
  rating: PropTypes.string,
  packageDetails: PropTypes.string,
  oldPrice: PropTypes.number,
  period: PropTypes.string,
  newPrice: PropTypes.number
};

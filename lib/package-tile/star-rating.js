import React, { Component, PropTypes } from 'react';
require('./style.css');

class StarRating extends Component {
  constructor () {
    super();
    this.rating;
  }

  setRating (count, style) {
    if (count > 0) {
      const { maxRating } = this.props;
      const max = count > maxRating ? maxRating : count;
      for (let i = 0; i < max; i++) {
        this.rating.push(style);
      }
    }
  }

  render () {
    const { starRating, maxRating } = this.props;
    const blurRatingStar = maxRating - Number(starRating);
    console.log(this.props, blurRatingStar);
    this.rating = [];

    this.setRating(starRating, 'ratingIcon');
    this.setRating(blurRatingStar, 'ratingIconBlur');
    return (
      <div>
        { this.rating.map((styleClass, i) => <span key={i} className={styleClass} />) }
      </div>
    );
  }
}

StarRating.propTypes = {
  starRating: PropTypes.number,
  maxRating: PropTypes.number
};

StarRating.defaultProps = {
  maxRating: 5
};

export default StarRating;

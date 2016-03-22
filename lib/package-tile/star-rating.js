import React, { Component, PropTypes } from 'react';
const maxRating = 5;
require('./style.css');

class StarRating extends Component {
  constructor () {
    super();
    this.rating;
  }

  setRating (count, style) {
    for (let i = 0; i < count; i++) {
      this.rating.push(style);
    }
  }
  render () {
    const { starRating } = this.props;
    const blurRatingStar = maxRating - Number(starRating);
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
  starRating: PropTypes.number
};

export default StarRating;

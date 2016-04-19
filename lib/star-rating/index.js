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
    const { starRating, maxRating, ratingIconUrl } = this.props;
    const blurRatingStar = maxRating - Number(starRating);
    this.rating = [];

    this.setRating(starRating, 'ratingIcon');
    this.setRating(blurRatingStar, 'ratingIconBlur');
    return (
      <div>
        {this.rating.map((styleClass, i) => {
          return (
            <span
              key={i}
              className={styleClass}
              style={{background: `url(${ratingIconUrl}) no-repeat`, backgroundSize: `${this.props.size}em`, width: `${this.props.width}em`, height: `${this.props.width}em`}}
            />
          );
        })
       }
      </div>
    );
  }
}

StarRating.propTypes = {
  starRating: PropTypes.number,
  maxRating: PropTypes.number,
  ratingIconUrl: PropTypes.string,
  width: PropTypes.number,
  size: PropTypes.number
};

StarRating.defaultProps = {
  maxRating: 5
};

export default StarRating;

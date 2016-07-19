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
            <image
              key={i}
              className={`${styleClass} ratingIconSize`}
              src={ratingIconUrl}
              style={{
                width: this.props.width,
                height: this.props.height
              }}
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
  width: PropTypes.string,
  height: PropTypes.string,
  size: PropTypes.number
};

StarRating.defaultProps = {
  maxRating: 5
};

export default StarRating;

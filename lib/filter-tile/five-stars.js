import React, { PropTypes, Component } from 'react';
import Star from './single-star.js';

require('./style.css');

export default class Stars extends Component {
  render () {
    const { color, handleClick, filledState } = this.props;

    return (
      <div className='starsContainer'>
        { Array(5).fill(0).map((el, i) => {
          return (
            <Star
              color={color}
              key={i}
              filled={filledState[i]}
              onClick={() => handleClick(i)}
              height={60}
              width={60}
            />
          );
        })
       }
      </div>
    );
  }
}

Stars.propTypes = {
  color: PropTypes.string,
  handleClick: PropTypes.func,
  filledState: PropTypes.array
};

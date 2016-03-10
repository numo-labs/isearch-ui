import React, { PropTypes, Component } from 'react';

require('./style.css');

export default class Stars extends Component {
  render () {
    const { color, handleClick, filledState } = this.props;
    return (
      <div className='starsContainer'>
        { Array(5).fill(0).map((el, i) => {
          const starFull = filledState[i] ? 'fa-star' : 'fa-star-o';
          return (
            <div
              onClick={() => handleClick(i)}
              key={i}
              className={`fa ${starFull} fa-2x faa-burst.animated`}
              style={{color: starFull ? '#ffffff' : color}}>
            </div>
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

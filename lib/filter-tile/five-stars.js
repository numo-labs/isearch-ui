import React, { PropTypes, Component } from 'react';

require('./style.css');
require('./font-awesome-animation.css');

export default class Stars extends Component {
  render () {
    const { handleClick, filledState } = this.props;
    return (
      <div className='starsContainer'>
        { Array(5).fill(0).map((el, i) => {
          const icon = filledState[i] ? 'fa-star' : 'fa-star-o';
          const pulsing = filledState[i] ? '' : 'faa-pulse animated';
           return (
            <div
              onClick={() => handleClick(i)}
              key={i}
              className={`fa ${icon} fa-2x ${pulsing}`}
              style={{color: '#ffffff', opacity: filledState[i] ? 1 : 0.6}}
            >
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

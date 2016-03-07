import React, { PropTypes, Component } from 'react';
import Stars from './five-stars.js';

require('./style.css');

export default class FilterTile extends Component {
  render () {
    const { description, color } = this.props;
    return (
      <div className="container" style={{backgroundColor: color}}>
        <div className="question-mark-container">?</div>
        <div className='inner-container'>
          <div className="description-container">
            <div className="description">{description.part1}</div>
            <div className="big-word">{description.bigWord}</div>
            <div className="description">{description.part2}</div>
          </div>
          <Stars color={color}/>
        </div>
      </div>
    );
  }
}

FilterTile.propTypes = {
  description: PropTypes.obj,
  color: PropTypes.string
};

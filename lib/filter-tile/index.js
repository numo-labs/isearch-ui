import React, { PropTypes, Component } from 'react';
import Stars from './five-stars.js';

require('./style.css');

export default class FilterTile extends Component {
  render () {
    return (
      <div className="container" style={{backgroundColor: '#B9CAA8'}}>
        <div className="question-mark-container">?</div>
        <div className="description">HOW IMPORTANT IS <span className="big-word"> NIGHTLIFE?</span> </div>
        <Stars />
      </div>
    );
  }
}

FilterTile.propTypes = {

};

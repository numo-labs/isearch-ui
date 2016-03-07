import React, { PropTypes, Component } from 'react';
import Star from './single-star.js';

require('./style.css');

export default class Stars extends Component {
  render () {
    return (
      <div className="stars-container">
        <Star height={60} width={60}/>
        <Star height={60} width={60}/>
        <Star height={60} width={60}/>
        <Star height={60} width={60}/>
        <Star height={60} width={60}/>
      </div>
    );
  }
}

Stars.propTypes = {

};

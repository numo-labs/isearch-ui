import React, { PropTypes, Component } from 'react';
import Star from './single-star.js';

require('./style.css');

export default class Stars extends Component {
  render () {
    const color = this.props.color;
    return (
      <div className="stars-container">
        <Star color={color} height={60} width={60}/>
        <Star color={color} height={60} width={60}/>
        <Star color={color} height={60} width={60}/>
        <Star color={color} height={60} width={60}/>
        <Star color={color} height={60} width={60}/>
      </div>
    );
  }
}

Stars.propTypes = {

};

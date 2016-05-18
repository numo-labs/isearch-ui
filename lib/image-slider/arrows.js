import React, { Component } from 'react';
import './arrow.style.css';

export class SliderArrowLeft extends Component {
  render () {
    return (
      <a {...this.props} className='left-arrow'/>
    );
  }
}

export class SliderArrowRight extends Component {
  render () {
    return (
      <a {...this.props} className='right-arrow'/>
    );
  }
}

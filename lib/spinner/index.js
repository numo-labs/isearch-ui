import React, { Component } from 'react';
require('./style.css');

class LoadingSpinner extends Component {
  render () {
    return (
      <div className='spinnerContainer'>
        <div className='loader' />
        <div>Finding your perfect holiday...</div>
      </div>
    );
  }
}

export default LoadingSpinner;

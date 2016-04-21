import React, { Component } from 'react';
require('./style.css');

class LoadingSpinner4 extends Component {
  render () {
    return (
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
    );
  }
}

export default LoadingSpinner4;

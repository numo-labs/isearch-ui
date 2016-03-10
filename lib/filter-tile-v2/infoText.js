import React, { Component } from 'react';

require('./style.css');

export default class InfoText extends Component {
  render () {
    return (
      <div className='bubble'>
        Click on this tile to filter the results based on your preferences
      </div>
    );
  }
}

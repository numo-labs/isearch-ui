import React, { Component } from 'react';

require('./style.css');

export default class InfoText extends Component {
  render () {
    return (
      <div className='bubble'>
        Grade how important you think this filter is and more destinations that match your preferences will appear
      </div>
    );
  }
}

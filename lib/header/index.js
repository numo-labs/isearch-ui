import React, { Component } from 'react';

require('./style.css');

export default class Header extends Component {
  render () {
    return (
      <div className='headerBarWrapper'>
        <div className='inspiration'>Hvor vil du rejse hen?</div>
      </div>
    );
  }
}

export default Header;

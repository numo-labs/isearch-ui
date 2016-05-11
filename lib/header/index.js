import React, { Component } from 'react';

require('./style.css');

export default class Header extends Component {
  render () {
    return (
      <div className='headerBarWrapper'>
          <div className='headerBarContainer'>
            <div className='headerContent'>
              <h1 className='spies'>Hvor vil du rejse hen?</h1>
            </div>
          </div>
        </div>
    );
  }
}

export default Header;

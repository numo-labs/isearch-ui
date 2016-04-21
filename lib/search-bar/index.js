import React, { Component } from 'react';

require('./style.css');

export default class Header extends Component {
  render () {
    return (
      <div className='headerBarWrapper'>
        <div className='headerBarContainer'>
          <div className='headerContent'>
            <img className='logo' src='https://cloud.githubusercontent.com/assets/12450298/13631826/8a5cb062-e5de-11e5-8b73-f2ec9d622d5f.png' />
            <h1 className='spies'>SPIES</h1>
          </div>
          <div>
            <div className='inspiration'>Inspiration</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

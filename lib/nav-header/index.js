import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
var backButton = require('../../src/assets/back.svg');
require('./style.css');

export default class NavHeader extends Component {
  render () {
    const { go } = this.props;
    return (
      <div className='navBarLayout'>
        <div className='navBarContainer'>
          <Link to='/' className='backButton' onClick={() => go(-2)}>
            <img src={backButton} className='navBackButton' alt='backButton'/>
          </Link>
        </div>
      </div>
    );
  }
}

NavHeader.propTypes = {
  go: PropTypes.func
};

export default NavHeader;

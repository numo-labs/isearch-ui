import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
var backButton = require('../../src/assets/back.svg');
require('./style.css');

// using go(-2) instead of goBack() because it is not supported by safari or IOS
export default class NavHeader extends Component {
  handleOnCLick () {
    const { go } = this.props;
    if (navigator.userAgent.indexOf('Chrome') !== -1) {
      go(-1);
    } else {
      go(-2);
    }
  }
  render () {
    return (
      <div className='navBarLayout'>
        <div className='navBarContainer'>
          <Link to='/' className='backButton' onClick={this.handleOnCLick.bind(this)}>
            <img src={backButton} className='navBackButton' alt='backButton'/>
          </Link>
        </div>
      </div>
    );
  }
}

NavHeader.propTypes = {
  go: PropTypes.func,
  goBack: PropTypes.func
};

export default NavHeader;

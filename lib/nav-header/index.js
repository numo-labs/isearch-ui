import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
var backButton = require('../../src/assets/back.svg');
require('./style.css');

export default class NavHeader extends Component {
  handleOnCLick () {
    const { go } = this.props;
    // if statement checks if the browser is safari
    // using go(-2) for safari instead of go(-1) because it hangs
    if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
      go(-2);
    } else {
      go(-1);
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

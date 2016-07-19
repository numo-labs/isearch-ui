import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import goBackBrowserDetect from '../../src/utils/browser-detection';
var backButton = require('../../src/assets/back.svg');
require('./style.css');

export default class NavHeader extends Component {
  handleOnCLick () {
    const { go } = this.props;
    goBackBrowserDetect(go);
  }
  render () {
    return (
      <div className='navBarLayout'>
        <div className='navBarContainer'>
          <Link to='/' className='backButton' onClick={this.handleOnCLick.bind(this)}>
            <img src={backButton} className='navBackButton' alt='backButton'/>
          </Link>
        </div>
        <div className='betaFlagBar'>BETA</div>
      </div>
    );
  }
}

NavHeader.propTypes = {
  go: PropTypes.func,
  goBack: PropTypes.func
};

export default NavHeader;

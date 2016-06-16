import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
var backButton = require('../../src/assets/back.svg');
require('./style.css');

export default class NavHeader extends Component {
  handleOnClick () {
    this.props.backToSearch();
  }
  render () {
    return (
      <div className='navBarLayout'>
        <div className='navBarContainer'>
          <Link to='/' className='backButton' onClick={this.handleOnClick.bind(this)}>
            <img src={backButton} className='navBackButton' alt='backButton'/>
          </Link>
        </div>
      </div>
    );
  }
}

NavHeader.propTypes = {
  backToSearch: PropTypes.func
};

export default NavHeader;

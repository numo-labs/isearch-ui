import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

require('./style.css');

export default class NavHeader extends Component {
  render () {
    const { backToSearch } = this.props;
    return (
      <div className='navBarLayout'>
        <div className='navBarContainer'>
          <Link to='/' className='backButton' onClick={() => backToSearch()}>
            <i className='fa fa-angle-left fa-2x' aria-hidden='true'></i>
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

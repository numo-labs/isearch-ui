import React, { Component, PropTypes } from 'react';

require('./style.css');

export default class NavHeader extends Component {
  render () {
    const { backToSearch } = this.props;
    return (
      <div className='navBarLayout'>
        <div className='navBarContainer'>
          <a className='backButton' onClick={() => backToSearch()}>
            <i className='fa fa-angle-left fa-2x' aria-hidden='true'></i>
          </a>
          <div className='share'>SHARE</div>
        </div>
      </div>
    );
  }
}

NavHeader.propTypes = {
  backToSearch: PropTypes.func
};

export default NavHeader;

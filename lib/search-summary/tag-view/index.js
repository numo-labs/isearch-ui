import React, { Component, PropTypes } from 'react';
const closeImage = require('../../../src/assets/close.svg');
import { Link } from 'react-router';

export default class TagView extends Component {
  render () {
    const { exitButtonClick } = this.props;
    return (
      <div className='blueContainer'>
        <div className={'tagViewActive dropDown'}>
          <Link to='/'>
            <img
              src={closeImage}
              alt='exit button'
              className='tagExitButton'
              onClick={exitButtonClick}
            />
          </Link>
          <div>replace this text with 'add tags' search bar and group of existing tags</div>
        </div>
      </div>
    );
  }
}

TagView.propTypes = {
  exitButtonClick: PropTypes.func
};

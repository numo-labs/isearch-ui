import React, { Component, PropTypes } from 'react';
const closeImage = require('../../../src/assets/close.svg');

export default class TagView extends Component {
  render () {
    const { exitButtonClick } = this.props;
    return (
      <div className='blueContainer'>
        <div className={'tagViewActive dropDown'}>
          <img
            src={closeImage}
            alt='exit button'
            className='tagExitButton'
            onClick={exitButtonClick}
          />
          <div>replace this text with 'add tags' search bar and group of existing tags</div>
        </div>
      </div>
    );
  }
}

TagView.propTypes = {
  exitButtonClick: PropTypes.func
};

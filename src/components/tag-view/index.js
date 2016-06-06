import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
const closeImage = require('../../../src/assets/close.svg');

export default class TagView extends Component {
  render () {
    const { goBack } = this.props;
    return (
      <div className='blueContainer'>
        <div className={'tagViewActive dropDown'}>
          <Link to='/' onClick={() => goBack()}>
            <img
              src={closeImage}
              alt='exit button'
              className='tagExitButton'
            />
          </Link>
          <div>replace this text with 'add tags' search bar and group of existing tags</div>
        </div>
      </div>
    );
  }
}

TagView.propTypes = {
  goBack: PropTypes.func
};

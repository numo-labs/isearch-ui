import React, { Component, PropTypes } from 'react';

export default class Tag extends Component {
  render () {
    return (
      <div className='tag' style={{backgroundColor: this.props.colour}}>
        <div className='tagName'>{this.props.displayName}</div>
        <div onClick={() => { this.props.removeTag(this.props.displayName); }} className='cross'>X</div>
      </div>
    );
  }
}

Tag.propTypes = {
  displayName: PropTypes.string,
  colour: PropTypes.string,
  removeTag: PropTypes.func
};

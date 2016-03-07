import React, { Component, PropTypes } from 'react';

export default class Tag extends Component {
  render () {
    return (
      <div className='tag' style={{backgroundColor: this.props.colour}}>
        <div className='tagName'>{this.props.tagName}</div>
        <div className='cross'>X</div>
      </div>
    );
  }
}

Tag.propTypes = {
  tagName: PropTypes.string,
  colour: PropTypes.string
};

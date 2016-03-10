import React, { Component, PropTypes } from 'react';

export default class Tag extends Component {
  render () {
    return (
      <div className='tag' style={{backgroundColor: this.props.colour}}>
        <div className='tagName'>{this.props.tagName}</div>
        <div onClick={() => { console.log("HELLLLLLO");this.props.removeTag(this.props.tagName)}} className='cross'>X</div>
      </div>
    );
  }
}

Tag.propTypes = {
  tagName: PropTypes.string,
  colour: PropTypes.string,
  removeTag: PropTypes.func
};

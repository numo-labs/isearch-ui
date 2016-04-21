import React, { Component, PropTypes } from 'react';

class DropDown extends Component {
  render () {
    return (
      <div>{this.props.title}</div>
    );
  }
}

DropDown.propTypes = {
  title: PropTypes.string
};

export default DropDown;

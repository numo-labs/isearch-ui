import React, { Component, PropTypes } from 'react';

class DropDown extends Component {
  renderOptions () {
    this.props.options.map(option => {
      return (
        <option>{option}</option>
      );
    });
  }
  render () {
    return (
      <select>
      <option></option>
      </select>
    );
  }
}

DropDown.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array
};

export default DropDown;

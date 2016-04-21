import React, { Component, PropTypes } from 'react';
import './styles.css';
class DropDown extends Component {
  renderOptions () {
    const options = this.props.options.map((option, index) => {
      console.log('option', option);
      return (
        <option key={index} className='option'>{option}</option>
      );
    });
    return options;
  }
  render () {
    console.log(this.renderOptions());
    return (
      <select className='drop'>
        {this.renderOptions()}
      </select>
    );
  }
}

DropDown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array
};

export default DropDown;

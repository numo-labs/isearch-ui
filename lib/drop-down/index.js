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
      <div style={{width: this.props.width}} className='dropContainer'>
        <div className='dropLabel'>{this.props.label}</div>
        <img src='https://cloud.githubusercontent.com/assets/12450298/14716632/1d15d2d6-07ee-11e6-8684-a34ecbf1c524.png' className='downArrow'/>
        <select className='drop'>
          {this.renderOptions()}
        </select>
      </div>
    );
  }
}

DropDown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  width: PropTypes.string
};

export default DropDown;

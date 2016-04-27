import React, { Component, PropTypes } from 'react';
import './styles.css';
class DropDown extends Component {
  renderOptions () {
    const options = this.props.options.map((option, index) => {
      return (
        <option key={index} className='option'>{option}</option>
      );
    });
    return options;
  }
  handleOnChange (e) {
    console.log('REFS', this.refs.selectValue.selectedOptions[0].text);
    console.log('------->>>>', e.target.value);
    // this.props.setValue(e.target.value, (this.props.childIndex + 1));
    this.props.setValue(this.refs.selectValue.selectedOptions[0].text, (this.props.childIndex + 1));
  }
  render () {
    return (
      <div style={{width: this.props.width}} className='dropContainer'>
        <div className='dropLabel'>{this.props.label}</div>
        <img src='https://cloud.githubusercontent.com/assets/12450298/14716632/1d15d2d6-07ee-11e6-8684-a34ecbf1c524.png' className='downArrow'/>
        <select value={this.props.valueDefault} required ref='selectValue' onChange={this.handleOnChange.bind(this)} className='drop'>
          {this.renderOptions()}
        </select>
      </div>
    );
  }
}
DropDown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  width: PropTypes.string,
  setValue: PropTypes.func,
  childIndex: PropTypes.number,
  optionsTitle: PropTypes.string,
  valueDefault: PropTypes.string
};

export default DropDown;

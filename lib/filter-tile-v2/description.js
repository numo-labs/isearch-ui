import React, { PropTypes, Component } from 'react';

require('./style.css');

export default class Description extends Component {
  render () {
    const { description, addFilterTag, removeFilterTag } = this.props;
    return (
      <div className='descriptionTextContainer'>
        <div className='description'>{description.part1}</div>
        <div className='bigWord'>{description.bigWord + '?'}</div>
        <div className='filterButtonContainer'>
          <div className='filterButton' onCick={addFilterTag}>YES</div>
          <div className='buttonSpacer'/>
          <div className='filterButton' onClick={removeFilterTag}>NO</div>
        </div>
      </div>
    );
  }
}

Description.propTypes = {
  description: PropTypes.object,
  addFilterTag: PropTypes.func,
  removeFilterTag: PropTypes.func
};

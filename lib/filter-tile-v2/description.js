import React, { PropTypes, Component } from 'react';

require('./style.css');

export default class Description extends Component {
  render () {
    const { description, yesFilter, noFilter } = this.props;
    return (
      <div className='descriptionTextContainer'>
        <div className='description'>{description.part1}</div>
        <div className='bigWord'>{description.bigWord}</div>
        <div className='filterButtonContainer'>
          <div className='filterButton' onClick={() => yesFilter(description.bigWord)}>YES</div>
          <div className='buttonSpacer'/>
          <div className='filterButton' onClick={noFilter}>NO</div>
        </div>
      </div>
    );
  }
}

Description.propTypes = {
  description: PropTypes.object,
  yesFilter: PropTypes.func,
  noFilter: PropTypes.func
};

import React, { PropTypes, Component } from 'react';

require('./style.css');

export default class Description extends Component {
  render () {
    const { description } = this.props;
    return (
      <div className='descriptionTextContainer'>
        <div className='descriptionText'>{description.part1}</div>
        <div className='bigCapsWord'>{description.bigWord}</div>
        <div className='descriptionText'>{description.part2}</div>
      </div>
    );
  }
}

Description.propTypes = {
  description: PropTypes.object
};

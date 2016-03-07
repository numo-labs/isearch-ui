import React, { PropTypes, Component } from 'react';

require('./style.css');

export default class Description extends Component {
  render () {
    const { description } = this.props;
    return (
      <div className='descriptionTextContainer'>
        <div className='description'>{description.part1}</div>
        <div className='bigWord'>{description.bigWord}</div>
        <div className='description'>{description.part2}</div>
      </div>
    );
  }
}

Description.propTypes = {
  description: PropTypes.obj
};

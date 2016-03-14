import React, { PropTypes, Component } from 'react';

require('./style.css');

export default class Description extends Component {
  constructor () {
    super();
    this.handleYesClick = this.handleYesClick.bind(this);
  }
  handleYesClick () {
    const { description, yesFilter, noFilter, showAddMessage } = this.props;
    yesFilter(description.bigWord);
    showAddMessage();
  }
  render () {
    const { description, yesFilter, noFilter, showAddMessage } = this.props;
    return (
      <div className='descriptionTextContainer'>
          <div className='description'>{description.part1}</div>
          <div className='bigWord'>{description.bigWord + ' ?'}</div>
          <div className='filterButtonContainer'>
          <div className='filterButton' onClick={this.handleYesClick}>YES</div>
          <div className='buttonSpacer'/>
            <div className='filterButton' onClick={() => noFilter(description.bigWord)}>NO</div>
          </div>
      </div>
    );
  }
}

Description.propTypes = {
  description: PropTypes.object,
  yesFilter: PropTypes.func,
  noFilter: PropTypes.func,
  showAddMessage: PropTypes.func
};

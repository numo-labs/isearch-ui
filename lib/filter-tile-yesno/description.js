import React, { PropTypes, Component } from 'react';

require('./style.css');

export default class Description extends Component {
  constructor () {
    super();
    this.handleYesClick = this.handleYesClick.bind(this);
  }
  handleYesClick () {
    const { description, onYesFilter } = this.props;
    onYesFilter(description.displayName, description.id);
    // showAddMessage();
  }
  render () {
    const { description, onNoFilter } = this.props;
    return (
      <div className='descriptionTextContainer'>
          <div className='description'>{description.prefix}</div>
          <div className='bigWord'>{description.displayName + ' ?'}</div>
          <div className='filterButtonContainer'>
            <div className='filterButton' onClick={this.handleYesClick}>YES</div>
            <div className='buttonSpacer'/>
            <div className='filterButton' onClick={() => onNoFilter(description.displayName)}>NO</div>
          </div>
      </div>
    );
  }
}

Description.propTypes = {
  description: PropTypes.object,
  onYesFilter: PropTypes.func,
  onNoFilter: PropTypes.func,
  showAddMessage: PropTypes.func
};

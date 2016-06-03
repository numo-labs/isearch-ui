import React, { PropTypes, Component } from 'react';

require('./style.css');

export default class Description extends Component {
  constructor () {
    super();
    this.handleYesClick = this.handleYesClick.bind(this);
    this.handleNoClick = this.handleNoClick.bind(this);
  }
  handleYesClick () {
    const { description, onYesFilter } = this.props;
    onYesFilter(description.displayName, description.id);
    if (dataLayer) {
      dataLayer.push({
        'event': 'filter_interaction',
        'filter_name': description.displayName,
        'filter_action': 'yes'
      });
    }
  }
  handleNoClick () {
    const { description, onNoFilter } = this.props;
    onNoFilter(description.displayName);
    if (dataLayer) {
      dataLayer.push({
        'event': 'filter_interaction',
        'filter_name': description.displayName,
        'filter_action': 'no'
      });
    }
  }

  render () {
    const { description } = this.props;
    return (
      <div className='descriptionTextContainer'>
          <div className='description'>{description.prefix}</div>
          <div className='bigWord'>{description.displayName + ' ?'}</div>
          <div className='filterButtonContainer'>
            <div className='filterButton' onClick={this.handleYesClick}>YES</div>
            <div className='buttonSpacer'/>
            <div className='filterButton' onClick={this.handleNoClick}>NO</div>
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

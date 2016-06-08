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
    onYesFilter(description.label, description.tagid);
    if (dataLayer) {
      dataLayer.push({
        'event': 'filter_interaction',
        'filter_name': description.id,
        'filter_action': 'yes'
      });
    }
  }
  handleNoClick () {
    const { description, onNoFilter } = this.props;
    onNoFilter();
    if (dataLayer) {
      dataLayer.push({
        'event': 'filter_interaction',
        'filter_name': description.id,
        'filter_action': 'no'
      });
    }
  }

  render () {
    const { description } = this.props;
    const label = (description.displayName || description.label) + ' ?';
    return (
      <div className='descriptionTextContainer'>
          <div className='description'>{description.prefix}</div>
          <div className='bigWord'>{label}</div>
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

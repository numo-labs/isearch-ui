import React, { PropTypes, Component } from 'react';
import Description from './description.js';
import InfoText from './infoText.js';

require('./style.css');

export default class FilterTile extends Component {
  constructor () {
    super();
    this.state = {
      infoBoxVisible: false
    };
    this.toggleInfoBox = this.toggleInfoBox.bind(this);
  }

  toggleInfoBox () {
    this.setState({infoBoxVisible: !this.state.infoBoxVisible});
  }

  handleVisibility (isVisible, item) {
    if (isVisible) {
      dataLayer.push({
        'ecommerce': {
          'impressions': [{
            'id': item.displayName,
            'category': 'yesNoFilter',
            'brand': 'filter_tile',
            'list': 'inspirational search feed'
          }]
        },
        'event': 'impressionsPushed'
      });
    }
  }

  render () {
    const { description, color, onYesFilter, onNoFilter, filterVisible, showAddMessage } = this.props;
    const { infoBoxVisible } = this.state;
    this.handleVisibility(filterVisible, description);
    return (
      <div>
      {
        filterVisible && <div className='filterContainer' style={{backgroundColor: color}}>
          <div className='questionMarkContainer' onClick={this.toggleInfoBox}>?</div>
          { infoBoxVisible && <InfoText /> }
          <div className='contentContainer'>
            <Description
              description={description}
              onYesFilter={onYesFilter}
              onNoFilter={onNoFilter}
              showAddMessage={showAddMessage}
            />
          </div>
        </div>
      }
      </div>
    );
  }
}

FilterTile.propTypes = {
  description: PropTypes.object,
  color: PropTypes.string,
  onYesFilter: PropTypes.func,
  onNoFilter: PropTypes.func,
  filterVisible: PropTypes.bool,
  showAddMessage: PropTypes.func
};

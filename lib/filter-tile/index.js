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
  render () {
    const { description, onYesFilter, onNoFilter, showAddMessage } = this.props;
    const { infoBoxVisible } = this.state;
    const type = description.tagid.split(':')[0];
    const color = (type === 'geo' ? '#CEC947' : '#8EB8C4');
    return (
      <div>
      {
        <div className='filterContainer' style={{backgroundColor: color}}>
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
  showAddMessage: PropTypes.func
};

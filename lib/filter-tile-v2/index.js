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
    const { description, color, addFilterTag, removeFilterTag } = this.props;
    const { infoBoxVisible } = this.state;

    return (
      <div className='filterContainer' style={{backgroundColor: color}}>
        <div className='questionMarkContainer' onClick={this.toggleInfoBox}>?</div>
        { infoBoxVisible && <InfoText /> }
        <div className='contentContainer'>
          <Description
            description={description}
            addFilterTag={addFilterTag}
            removeFilterTag={removeFilterTag}
          />
        </div>
      </div>
    );
  }
}

FilterTile.propTypes = {
  description: PropTypes.object,
  color: PropTypes.string,
  addFilterTag: PropTypes.func,
  removeFilterTag: PropTypes.func
};

FilterTile.defaultProps = {
  addFilterTag: () => console.log('Filter Tile')
};

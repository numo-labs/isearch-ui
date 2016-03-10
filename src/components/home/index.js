import React, { Component, PropTypes } from 'react';
import Tags from '../../containers/tags';
import SearchSummary from 'search-summary';
import SearchBar from 'search-bar';
import * as mockData from './mockData.js';
import Grid from './grid.js';
import AddMessage from 'add-message';

require('./style.css');
require('./normalise.css');
class Gallery extends Component {

  render () {
    const { searchSummary, ...tileData } = mockData;
    const { addMessageVisible, showAddMessage, hideAddMessage, yesFilter, noFilter, filterVisible } = this.props;
    return (
      <div className='homeContainer'>
        <SearchBar />
        <SearchSummary {...searchSummary} />
        <Tags />
        <Grid yesFilter={yesFilter} noFilter={noFilter} filterVisible={filterVisible} showAddMessage={showAddMessage} tileData={tileData}/>
        {addMessageVisible && <AddMessage hideAddMessage={hideAddMessage} suggestedLocations='Croatia and Greece'/>}
      </div>
    );
  }
}

Gallery.propTypes = {
  addMessageVisible: PropTypes.boolean,
  showAddMessage: PropTypes.func,
  hideAddMessage: PropTypes.func,
  yesFilter: PropTypes.func,
  noFilter: PropTypes.func,
  filterVisible: PropTypes.boolean
};

export default Gallery;

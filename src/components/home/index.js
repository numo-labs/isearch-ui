import React, { Component } from 'react';
import Tags from 'tags';
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
    const { addMessageVisible, showAddMessage, hideAddMessage } = this.props;
    return (
      <div className='homeContainer'>
        <SearchBar />
        <SearchSummary {...searchSummary} />
        <Tags />
        <Grid showAddMessage={showAddMessage} tileData={tileData}/>
        {addMessageVisible && <AddMessage hideAddMessage={hideAddMessage} suggestedLocations='Croatia and Greece'/>}
      </div>
    );
  }
}

export default Gallery;

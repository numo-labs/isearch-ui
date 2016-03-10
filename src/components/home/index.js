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
  constructor () {
    super();
    this.state = {
      addMessageVisible: false
    };
    this.hideAddMessage = this.hideAddMessage.bind(this);
    this.showAddMessage = this.showAddMessage.bind(this);
  }

  hideAddMessage () {
    this.setState({addMessageVisible: false});
  }

  showAddMessage () {
    setTimeout(() => {
      this.setState({addMessageVisible: true});
    }, 500);
  }

  render () {
    const { searchSummary, ...tileData } = mockData;
    const { addMessageVisible } = this.state;
    return (
      <div className='homeContainer'>
        <SearchBar />
        <SearchSummary {...searchSummary} />
        <Tags />
        <Grid showAddMessage={this.showAddMessage} tileData={tileData}/>
        {addMessageVisible && <AddMessage hideAddMessage={this.hideAddMessage} suggestedLocations='Croatia and Greece'/>}
      </div>
    );
  }
}

export default Gallery;

import React, { Component } from 'react';
import Tags from 'tags';
import SearchSummary from 'search-summary';
import SearchBar from 'search-bar';
import * as mockData from './mockData.js';
import Grid from './grid.js';

require('./style.css');

class Gallery extends Component {
  render () {
    const { searchSummary, ...tileData } = mockData;

    return (
      <div className='homeContainer'>
        <SearchBar />
        <SearchSummary {...searchSummary} />
        <Tags />
        <Grid tileData={tileData}/>
      </div>
    );
  }
}

export default Gallery;

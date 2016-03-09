import React, { Component } from 'react';
import Tags from 'tags';
import SearchSummary from 'search-summary';
import * as tileData from './fixtures.js';
import Grid from './grid.js';

require('./style.css');

class Gallery extends Component {
  render () {
    return (
      <div className='homeContainer'>
        <SearchSummary
          city='Bodrum'
          country='Turkey'
          durationInWeeks={2}
          paxMix='2 adults, 2 children'
          departureDate='Sun 13 jul 2016'
          returnDate='Tue 15 jul 2016'
        />
        <Tags />
        <Grid tileData={tileData}/>
      </div>
    );
  }
}

export default Gallery;

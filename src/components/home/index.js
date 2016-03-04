import React, { PropTypes, Component } from 'react';
import MasonryGrid from '../masonry-grid';
import SearchTile from '../search-tile/index.js';

export default class Home extends Component {

  render () {
    return (
      <MasonryGrid>
        <SearchTile title='tile'/>
      </MasonryGrid>
    );
  }
}

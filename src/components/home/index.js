import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import SearchTile from 'search-tile';
import FilterTile from 'filter-tile';

const masonryOptions = {
  transitionDuration: 0,
  columnWidth: 375,
  gutter: 10 // horizontal spacing between tiles
};

class Gallery extends Component {
  render () {
    return (
      <Masonry
        elementType={'div'}
        options={masonryOptions}
        disableImagesLoaded={false}
      >
        <FilterTile />
        <SearchTile height='1' title='tile' />
      </Masonry>
    );
  }
}

export default Gallery;

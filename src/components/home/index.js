import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import SearchTile from 'search-tile';

const masonryOptions = {
  transitionDuration: 0
};

class Gallery extends Component {
  render () {
    return (
      <Masonry
        elementType={'div'}
        options={masonryOptions}
        disableImagesLoaded={false}
      >
        <SearchTile height='1' title='tile' />
        <SearchTile height='3' title='tile' />
        <SearchTile height='2' title='tile' />
        <SearchTile height='1' title='tile' />
        <SearchTile height='1' title='tile' />
        <SearchTile height='3' title='tile' />
        <SearchTile height='2' title='tile' />
        <SearchTile height='1' title='tile' />
      </Masonry>
    );
  }
}

export default Gallery;

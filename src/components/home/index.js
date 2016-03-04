import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import SearchTile from '../search-tile/index.js';

const masonryOptions = {
  transitionDuration: 0
};

// import s from './style.css'; // not used

class Gallery extends Component {
  render () {
    return (
      <Masonry
        elementType={'div'} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
      >
        <SearchTile width='1' title='tile' />
        <SearchTile width='2' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='4' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='2' title='tile' />
        <SearchTile width='1' title='tile' />
        <SearchTile width='1' title='tile' />
        <SearchTile width='2' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='4' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='2' title='tile' />
        <SearchTile width='1' title='tile' />
        <SearchTile width='1' title='tile' />
        <SearchTile width='2' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='4' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='2' title='tile' />
        <SearchTile width='1' title='tile' />
        <SearchTile width='1' title='tile' />
        <SearchTile width='2' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='4' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='2' title='tile' />
        <SearchTile width='1' title='tile' />
        <SearchTile width='1' title='tile' />
        <SearchTile width='2' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='4' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='2' title='tile' />
        <SearchTile width='1' title='tile' />
        <SearchTile width='1' title='tile' />
        <SearchTile width='2' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='4' title='tile' />
        <SearchTile width='3' title='tile' />
        <SearchTile width='2' title='tile' />
        <SearchTile width='1' title='tile' />
      </Masonry>
    );
  }
}

export default Gallery;

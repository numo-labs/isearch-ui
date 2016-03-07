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
    const filter1 = {
      part1: 'HOW IMPORTANT IS ',
      bigWord: 'NIGHTLIFE ?',
      part2: ''
    };

    const filter2 = {
      part1: 'SHOW ME PLACES WHERE ',
      bigWord: 'FOOD & DRINK',
      part2: 'GETS 4 STARS'
    };

    const filter3 = {
      part1: 'SHOW ME PLACES WHERE ',
      bigWord: 'SIGHTS',
      part2: 'GETS 2 STARS'
    };

    return (
      <Masonry
        elementType={'div'}
        options={masonryOptions}
        disableImagesLoaded={false}
      >
        <FilterTile description={filter1} color={'#B9CAA8'}/>
        <FilterTile description={filter2} color={'#F19024'}/>
        <FilterTile description={filter3} color={'#DA3A68'}/>
        <SearchTile height='1' title='tile' />
      </Masonry>
    );
  }
}

export default Gallery;

'use strict';

import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import FilterTile from 'filter-tile';
import PackageTile from 'package-tile';
import Article from 'article';

require('./style.css');

export const masonryOptions = {
  transitionDuration: 0,
  itemSelector: '.gridItem',
  columnWidth: '.gridSizer',
  gutter: 10 // horizontal spacing between tiles
};

class TileGrid extends Component {
  render () {
    const {
      filter1,
      filter2,
      filter3,
      filter4,
      instagramPrefix,
      packageInfo
    } = this.props.tileData;

    console.log("PROPS", this.props)

    return (
      <Masonry
        elementType={'div'}
        options={masonryOptions}
        disableImagesLoaded={false}
      >
        <div className='gridSizer'/>
        <div className='gridItem'>
          <PackageTile { ...packageInfo } />
        </div>
        <div className='gridItem'>
          <FilterTile description={filter1} color={'#B9CAA8'}/>
        </div>
        <div className='gridItem'>
          <Article
            backgroundImage={`${instagramPrefix}s750x750/sh0=108/e35/12479379_141330706245237_420500081_n.jpg`}
            type='Sun and Bathe'
            title='10 TURKISH GEMS'
            overview='CLOSE TO BEACH AND CITY'
          />
        </div>
        <div className='gridItem'>
          <FilterTile description={filter4} color={'#8FB8C3'}/>
        </div>
        <div className='gridItem'>
          <PackageTile { ...packageInfo } />
        </div>
        <div className='gridItem'>
          <FilterTile description={filter2} color={'#F19024'}/>
        </div>
        <div className='gridItem'>
          <Article backgroundImage={`${instagramPrefix}e35/10472010_1689478414643553_296617682_n.jpg`} type='Explore' title='YOSEMITE' overview='5 HIDDEN SECRETS OF' />
        </div>
        <div className='gridItem'>
          <FilterTile description={filter3} color={'#DA3A68'}/>
        </div>
      </Masonry>
    );
  }
}

TileGrid.propTypes = {
  tileData: PropTypes.obj
};

export default TileGrid;

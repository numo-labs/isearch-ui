import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import FilterTile from 'filter-tile';
import Tags from 'tags';
import Article from 'article';

require('./style.css');

const masonryOptions = {
  transitionDuration: 0,
  itemSelector: '.gridItem',
  columnWidth: '.gridSizer',
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

    const instagramPrefix = 'https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xpf1/t51.12885-15/';

    return (
      <div className='homeContainer'>
        <Tags />
        <Masonry
          elementType={'div'}
          options={masonryOptions}
          disableImagesLoaded={false}
        >
        <div className='gridSizer'/>
          <div className='gridItem'>
            <Article
            backgroundImage='https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xfa1/t51.12885-15/s750x750/sh0=108/e35/12479379_141330706245237_420500081_n.jpg' type='Sun and Bathe' title='10 TURKISH GEMS' overview='CLOSE TO BEACH AND CITY' />
          </div>
          <div className='gridItem'>
            <FilterTile description={filter1} color={'#B9CAA8'}/>
            </div>
          <div className='gridItem'>
            <FilterTile description={filter2} color={'#F19024'}/>
          </div>
          <div className='gridItem'>
            <Article backgroundImage='https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xpf1/t51.12885-15/e35/10472010_1689478414643553_296617682_n.jpg' type='Explore' title='YOSEMITE' overview='5 HIDDEN SECRETS OF' />
          </div>
          <div className='gridItem'>
          <FilterTile description={filter3} color={'#DA3A68'}/>
          </div>
        </Masonry>
      </div>
    );
  }
}

export default Gallery;

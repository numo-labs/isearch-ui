import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import FilterTile from 'filter-tile';
import Tags from 'tags';
import PackageTile from 'package-tile';
import Article from 'article';
import SearchSummary from 'search-summary';
import SearchBar from 'search-bar';

require('./style.css');

const masonryOptions = {
  transitionDuration: 0,
  itemSelector: '.gridItem',
  columnWidth: '.gridSizer',
  gutter: 10 // horizontal spacing between tiles
};

const filter1 = {
  part1: 'How important is ',
  bigWord: 'nightlife ?',
  part2: ''
};

const filter2 = {
  part1: 'Show me places where ',
  bigWord: 'Food & Drink',
  part2: 'gets 4 stars'
};

const filter3 = {
  part1: 'Show me places where ',
  bigWord: 'sights',
  part2: 'gets 2 stars'
};

const filter4 = {
  part1: 'How much ',
  bigWord: 'Sport & Adventure',
  part2: 'do you want?'
};

const instagramPrefix = 'https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xpf1/t51.12885-15/';

const packageInfo = {
  imageSrc: `${instagramPrefix}hphotos-ak-xap1/t51.12885-15/e35/12519323_1674541939492426_1587996260_n.jpg`,
  caption: 'Child friendly',
  title: 'Sunwing Side East Beach',
  subtitle: 'Side, Antalya-area Turkey',
  numHearts: 4,
  rating: '4.4/5',
  packageDetails: 'Breakfast buffet',
  oldPrice: 30.280,
  period: '16 nov 2015, 1 week',
  newPrice: 27.440
};

class Gallery extends Component {
  render () {
    return (
      <div className='homeContainer'>
        <SearchBar />
        <SearchSummary city='Bodrum' country='Turkey' durationInWeeks={2} paxMix='2 adults, 2 children' departureDate='Sun 13 jul 2016' returnDate='Tue 15 jul 2016' />
        <Tags />
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
      </div>
    );
  }
}

export default Gallery;

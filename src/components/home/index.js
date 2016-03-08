import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import SearchTile from 'search-tile';
import FilterTile from 'filter-tile';
import Tags from 'tags';
import PackageTile from 'package-tile';

const masonryOptions = {
  transitionDuration: 0,
  columnWidth: 375,
  gutter: 10 // horizontal spacing between tiles
};

class Gallery extends Component {
  render () {
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

    const packageInfo = {
      imageSrc: 'https://lh5.ggpht.com/X6S-3G1irwe649hOPWe2GYqcl4eSxK69r6Y1CGoC9oXk45MRwTTywpz0vdVoQS0_vVVX=h900',
      caption: 'Child friendly',
      title: 'Sunwing Side East Beach',
      subtitle: 'Side, Antalya-area Turkey',
      numHearts: 4,
      rating: '4.4/5',
      packageDetails: 'Breakfast buffet',
      oldPrice: 30.280,
      period: '16 nov 2015, 1 week' ,
      newPrice: 27.440,
    };

    return (
      <div>
        <Tags />
        <Masonry
          elementType={'div'}
          options={masonryOptions}
          disableImagesLoaded={false}
        >
          <FilterTile description={filter1} color={'#B9CAA8'}/>
          <FilterTile description={filter2} color={'#F19024'}/>
          <FilterTile description={filter3} color={'#DA3A68'}/>
          <FilterTile description={filter4} color={'#8FB8C3'}/>
          <PackageTile { ...packageInfo } />
          <SearchTile backgroundImage='https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xta1/t51.2885-15/e15/11245924_1592722294278649_2115388840_n.jpg' height='1' title='tile' />
          <SearchTile backgroundImage='https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xap1/t51.12885-15/e35/10354524_1569704863350745_1720947713_n.jpg' height='3' title='tile' />
          <SearchTile backgroundImage='https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xtp1/t51.12885-15/s750x750/sh0=108/e35/12479569_1511440029160330_2051512338_n.jpg' height='2' title='tile' />
          <SearchTile backgroundImage='https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xfa1/t51.12885-15/s750x750/sh0=108/e35/12479379_141330706245237_420500081_n.jpg' height='1' title='tile' />
          <SearchTile backgroundImage='https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xpt1/t51.12885-15/e35/12317558_871885356264557_1261701372_n.jpg' height='1' title='tile' />
          <SearchTile backgroundImage='https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xat1/t51.12885-15/s480x480/e35/11372329_797617147014237_91767189_n.jpg' height='3' title='tile' />
          <SearchTile backgroundImage='https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xft1/t51.12885-15/e35/11849340_868310336598467_1674977288_n.jpg' height='2' title='tile' />
          <SearchTile backgroundImage='https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xtf1/t51.12885-15/e35/11850258_319096674927502_737529814_n.jpg' height='1' title='tile' />
        </Masonry>
      </div>
    );
  }
}

export default Gallery;

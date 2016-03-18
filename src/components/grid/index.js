'use strict';

import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import FilterTile from 'filter-tile-yesno';
import PackageTile from 'package-tile';
import Article from 'article';
import items from '../../utils/mock-search-results.js';

require('./style.css');

const masonryOptions = {
  transitionDuration: '0.4s',
  itemSelector: '.gridItem',
  fitWidth: true,
  gutter: 14 // horizontal spacing between tiles
};

class TileGrid extends Component {
  render () {
    const {
      filter1,
      filter2,
      filter3,
      filter4,
      article1,
      article2
    } = this.props.tileData;
    return (
      <Masonry
        elementType={'div'}
        options={masonryOptions}
        disableImagesLoaded={false}
        className='grid'
      >
        {
          items.map((item, i) => {
            if (item.type === 'packageOffer') {
              return (
                <div className='gridItem'>
                <PackageTile
                  key={item.packageOffer.id}
                  packageOffer={item.packageOffer}
                />
                </div>
              );
            } else if (item.type === 'tile') {
              return (
                <div key={item.id}></div>
              );
            }
          })
        }
        <div className='gridItem'>
          <FilterTile
            filterVisible={this.props.filters[filter1.bigWord]}
            yesFilter={this.props.yesFilter}
            noFilter={this.props.noFilter}
            showAddMessage={this.props.showAddMessage}
            description={filter1} color={'#B9CAA8'}
          />
        </div>
        <div className='gridItem'>
          <Article {...article1} />
        </div>
        <div className='gridItem'>
          <FilterTile
            filterVisible={this.props.filters[filter4.bigWord]}
            yesFilter={this.props.yesFilter}
            noFilter={this.props.noFilter}
            showAddMessage={this.props.showAddMessage}
            description={filter4}
            color={'#8FB8C3'}
          />
        </div>
        <div className='gridItem'>
          <FilterTile
            filterVisible={this.props.filters[filter2.bigWord]}
            yesFilter={this.props.yesFilter}
            noFilter={this.props.noFilter}
            showAddMessage={this.props.showAddMessage}
            description={filter2}
            color={'#F19024'}
          />
        </div>
        <div className='gridItem'>
          <Article {...article2} />
        </div>
        <div className='gridItem'>
          <FilterTile
            filterVisible={this.props.filters[filter3.bigWord]}
            yesFilter={this.props.yesFilter}
            noFilter={this.props.noFilter}
            showAddMessage={this.props.showAddMessage}
            description={filter3}
            color={'#DA3A68'}
          />
        </div>
      </Masonry>
    );
  }
}

TileGrid.propTypes = {
  tileData: PropTypes.object,
  showAddMessage: PropTypes.func,
  yesFilter: PropTypes.func,
  noFilter: PropTypes.func,
  filters: PropTypes.object
};

export default TileGrid;

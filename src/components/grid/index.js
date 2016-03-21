'use strict';

import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import FilterTile from 'filter-tile-yesno';
import PackageTile from 'package-tile';
import Article from 'article';

require('./style.css');

const masonryOptions = {
  transitionDuration: '0.4s',
  itemSelector: '.gridItem',
  fitWidth: true,
  gutter: 14 // horizontal spacing between tiles
};

class TileGrid extends Component {
  componentDidMount () {
  }
  render () {
    const { items, showAddMessage, yesFilter, noFilter, filters } = this.props;
    return (
      <Masonry
        elementType={'div'}
        options={masonryOptions}
        disableImagesLoaded={false}
        className='grid load-effect'
      >
        {
          items.map((item, i) => {
            if (item.type === 'packageOffer') {
              return (
                <div key={i} className='gridItem'>
                <PackageTile
                  key={item.packageOffer.id}
                  packageOffer={item.packageOffer}
                />
                </div>
              );
            } else if (item.type === 'filter') {
              return (
                <div key={i} className='gridItem'>
                  <FilterTile
                    filterVisible={filters[item.bigWord]}
                    yesFilter={yesFilter}
                    noFilter={noFilter}
                    showAddMessage={showAddMessage}
                    description={item} color={item.color}
                  />
                </div>
              );
            } else if (item.type === 'article') {
              return (
                <div key={i} className='gridItem'>
                  <Article {...item} />
                </div>
              );
            }
          })
        }
      </Masonry>
    );
  }
}

TileGrid.propTypes = {
  tileData: PropTypes.object,
  showAddMessage: PropTypes.func,
  yesFilter: PropTypes.func,
  noFilter: PropTypes.func,
  filters: PropTypes.object,
  items: PropTypes.array
};

export default TileGrid;

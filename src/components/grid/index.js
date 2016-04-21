'use strict';

import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import FilterTile from '../../../lib/filter-tile-yesno';
import PackageTile from '../../../lib/package-tile';
import Article from '../../../lib/article';
import VisbilitySensor from 'react-visibility-sensor';

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

  handleVisibility (isVisible, item) {
    const reference = item.packageOffer.provider.reference;
    if (isVisible) {
      dataLayer.push({
        'ecommerce': {
          'impressions': [{
            'id': item.packageOffer.provider.reference// + '-' + this.props.index
          }]
        },
        'event': 'impressionsPushed'
      });
    }
  }
  render () {
    const { items, showAddMessage, onYesFilter, onNoFilter, filters } = this.props;
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
                <VisbilitySensor key={i} onChange={(isVisible) => this.handleVisibility(isVisible, item)}>
                  <div key={i} className='gridItem'>
                  <PackageTile
                    key={item.packageOffer.id}
                    packageOffer={item.packageOffer}
                  />
                  </div>
                </VisbilitySensor>
              );
            } else if (item.type === 'filter') {
              return (
                <div key={i} className='gridItem'>
                  <FilterTile
                    filterVisible={filters[item.bigWord]}
                    onYesFilter={onYesFilter}
                    onNoFilter={onNoFilter}
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
  onYesFilter: PropTypes.func,
  onNoFilter: PropTypes.func,
  filters: PropTypes.object,
  items: PropTypes.array
};

export default TileGrid;

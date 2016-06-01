import React, { PropTypes, Component } from 'react';
import Masonry from 'react-masonry-component';
import FilterTile from '../../../lib/filter-tile';
import PackageTile from '../../../lib/package-tile';
import { ArticleTile } from '../../../lib/article-tile';
import VisbilitySensor from 'react-visibility-sensor';
import './style.css';

const masonryOptions = {
  transitionDuration: '0.4s',
  itemSelector: '.gridItem',
  fitWidth: true,
  gutter: 14 // horizontal spacing between tiles
};

class SearchResults extends Component {
  handleVisibility (isVisible, item) {
    if (dataLayer && isVisible && item.type === 'packageOffer') {
      dataLayer.push({
        'ecommerce': {
          'impressions': [{
            'id': item.packageOffer.provider.reference,
            'brand': 'hotel_tile',
            'list': 'inspirational search feed'
          }]
        },
        'event': 'impressionsPushed'
      });
    } else if (dataLayer && isVisible && item.type === 'filter') {
      dataLayer.push({
        'ecommerce': {
          'impressions': [{
            'id': item.displayName,
            'brand': 'filter_tile',
            'list': 'inspirational search feed'
          }]
        },
        'event': 'impressionsPushed'
      });
    } else if (dataLayer && isVisible && item.type === 'article') {
      dataLayer.push({
        'event': 'impressionsPushed',
        'ecommerce': {
          'impressions': [{
            'id': 'article name', // can this be extracted from the backend?
            'category': 'article category', // can this be fetched?
            'brand': 'article_tile', // hardcoded
            'list': 'inspirational search feed'
          }]
        }});
    }
    return;
  }
  render () {
    const {
      items,
      filterVisibleState,
      onYesFilter,
      onFilterClick,
      totalPassengers,
      // resultId,
      changeRoute,
      removeTile
    } = this.props;

    // TODO replace urls to valid ones
    return (
      <Masonry
        elementType={'div'}
        options={masonryOptions}
        disableImagesLoaded={false}
        className='grid load-effect'
      >
        {
          items.map((item, index) => {
            if (item.packageOffer) {
              return (
                <VisbilitySensor key={index} onChange={(isVisible) => this.handleVisibility(isVisible, item)}>

                  <div className='gridItem'>
                    <div onClick={() => removeTile(item.id)}>
                      <img className='removeTileButton' src='../../src/assets/cancel.svg' alt='cancelled' />
                    </div>
                    <div key={index} onClick={() => changeRoute(`/hotel/${item.url}`)}>
                      <PackageTile
                        key={item.packageOffer.id}
                        packageOffer={item.packageOffer}
                        totalPassengers={totalPassengers}
                        itemId={item.packageOffer.id}
                        removeTile={removeTile}
                        item={item}
                      />
                    </div>
                  </div>
                </VisbilitySensor>
              );
            } else if (item.type === 'tile') {
              if (item.tile.type === 'filter') {
                return (
                  <VisbilitySensor key={index} onChange={(isVisible) => this.handleVisibility(isVisible, item)}>
                    <div key={index} className='gridItem'>
                      <FilterTile
                        filterVisible={filterVisibleState[item.tile.displayName]}
                        onYesFilter={onYesFilter}
                        onNoFilter={onFilterClick}
                        description={item.tile}
                        color={item.tile.color}
                      />
                    </div>
                  </VisbilitySensor>

                );
              } else if (item.tile.type === 'article' && item.tile.sections && item.tile.sections.length > 0) {
                return (
                  <VisbilitySensor key={index} onChange={(isVisible) => this.handleVisibility(isVisible, item)}>
                    <div key={index} className='gridItem'>
                      <div onClick={() => removeTile(item.id)}>
                        <img className='removeTileButton' src='../../src/assets/cancel.svg' alt='cancel' />
                      </div>
                      <div onClick={() => changeRoute(`/article/${item.url}`)}>
                        <ArticleTile {...item} />
                      </div>
                    </div>
                  </VisbilitySensor>
                );
              }
            }
          })
        }
      </Masonry>
    );
  }
}

SearchResults.propTypes = {
  onYesFilter: PropTypes.func,
  onFilterClick: PropTypes.func,
  items: PropTypes.array,
  filterVisibleState: PropTypes.object,
  setHotelPage: PropTypes.func,
  totalPassengers: PropTypes.number,
  // resultId: PropTypes.string,
  changeRoute: PropTypes.func,
  removeTile: PropTypes.func
};

export default SearchResults;

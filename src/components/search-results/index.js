import React, { PropTypes, Component } from 'react';
import Masonry from 'react-masonry-component';
import FilterTile from '../../../lib/filter-tile-yesno';
import PackageTile from '../../../lib/package-tile';
import { ArticleTile } from '../../../lib/article';
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
      console.log('datalayer: ', item.packageOffer.provider.reference);
      dataLayer.push({
        'ecommerce': {
          'impressions': [{
            'id': item.packageOffer.provider.referen,
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
      showAddMessage,
      viewArticle
    } = this.props;
    return (
      <Masonry
        elementType={'div'}
        options={masonryOptions}
        disableImagesLoaded={false}
        className='grid load-effect'
      >
        {
          items.map((item, index) => {
            if (item.type === 'packageOffer') {
              return (
                <VisbilitySensor key={index} onChange={(isVisible) => this.handleVisibility(isVisible, item)}>
                  <div key={index} className='gridItem'>
                    <PackageTile
                      key={item.packageOffer.id}
                      packageOffer={item.packageOffer}
                    />
                  </div>
                </VisbilitySensor>
              );
            } else if (item.type === 'filter') {
              console.log('itemVisible', filterVisibleState[item.displayName]);
              return (
                <VisbilitySensor key={index} onChange={(isVisible) => this.handleVisibility(isVisible, item)}>
                  <div key={index} className='gridItem'>
                    <FilterTile
                      filterVisible={filterVisibleState[item.displayName]}
                      onYesFilter={onYesFilter}
                      onNoFilter={onFilterClick}
                      showAddMessage={showAddMessage}
                      description={item}
                      color={item.color}
                    />
                  </div>
                </VisbilitySensor>

              );
            } else if (item.type === 'tile') {
              console.log('tile', item);
              return (
                <VisbilitySensor key={index} onChange={(isVisible) => this.handleVisibility(isVisible, item)}>
                  <div key={index} className='gridItem'>
                    <ArticleTile {...item} viewArticle={viewArticle}/>
                  </div>
                </VisbilitySensor>
              );
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
  showAddMessage: PropTypes.func,
  items: PropTypes.array,
  filterVisibleState: PropTypes.object,
  viewArticle: PropTypes.func
};

export default SearchResults;

import React, { PropTypes, Component } from 'react';
import Masonry from 'react-masonry-component';
import FilterTile from '../../../lib/filter-tile';
import PackageTile from '../../../lib/package-tile';
import ArticleTile from '../../../lib/article-tile';
import VisibilitySensor from 'react-visibility-sensor';
import DestinationTile from '../../../lib/destination-tile';

const removeTileButton = require('../../assets/cancel.svg');
import './style.css';

const masonryOptions = {
  transitionDuration: '0.4s',
  fitWidth: true,
  gutter: 14 // horizontal spacing between tiles
};

class SearchResults extends Component {
  constructor () {
    super();
    this.mapItems = this.mapItems.bind(this);
  }

  handleVisibility (isVisible, item) {
    if (!dataLayer || !isVisible) {
      return;
    }
    if (item.type === 'packageOffer') {
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
    } else if (item.type === 'filter') {
      dataLayer.push({
        'ecommerce': {
          'impressions': [{
            'id': item.id,
            'brand': 'filter_tile',
            'list': 'inspirational search feed'
          }]
        },
        'event': 'impressionsPushed'
      });
    } else if (item.type === 'article') {
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
  handleClickEvent (item) {
    const clickEventObject = {
      'event': 'productClick',
      'ecommerce': {
        'click': {
          'actionField': {'list': 'inspirational search feed'},
          'products': []
        }
      }
    };
    if (dataLayer && item.type === 'packageOffer') {
      clickEventObject.ecommerce.click.products.push({
        'id': item.packageOffer.provider.reference,
        'brand': 'hotel_tile'
      });
      dataLayer.push(clickEventObject);
    } else if (dataLayer && item.type === 'article') {
      clickEventObject.ecommerce.click.products.push({
        'id': item.tile.id,
        'brand': 'article_tile'
      });
      dataLayer.push(clickEventObject);
    }
    return;
  }

  mapItems (items) {
    return (
      items.map((item, index) => {
        return (
          <VisibilitySensor key={index} onChange={(isVisible) => this.handleVisibility(isVisible, item)}>
            <div key={index} className='gridItem'>
              {this.renderItem(item, index)}
            </div>
          </VisibilitySensor>
        );
      })
    );
  }

  removeButton (id) {
    const {
      removeTile
    } = this.props;
    return (
      <div onClick={() => removeTile(id)}>
        <img className='removeTileButton' src={removeTileButton} alt='cancelled' />
      </div>
    );
  }

  renderItem (item, index) {
    const {
      onYesFilter,
      totalPassengers,
      changeRoute,
      viewedArticles,
      removeTile,
      addSingleTag
    } = this.props;

    if (item.packageOffer) {
      return (
        <div>
          {this.removeButton(item.id)}
          <div className='clickable' onClick={() => { this.handleClickEvent(item); changeRoute(`/hotel/${item.url}`); }}>
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
      );
    } else if (item.type === 'tile') {
      const contentExists = item.tile.sections && item.tile.sections.length > 0;
      if (item.tile.type === 'article' && contentExists) {
        return (
          <div>
            {this.removeButton(item.id)}
            <div className='clickable' onClick={() => { this.handleClickEvent(item); changeRoute(`/article/${item.url}`); }}>
              <ArticleTile
                className={viewedArticles.indexOf(item.tile.id) > -1 ? 'visited' : ''}
                {...item}
                onAddTagClick={(event) => { event.stopPropagation(); addSingleTag(item.tile.name, item.tile.id); removeTile(item.id); }}
              />
            </div>
          </div>
        );
      } else if (item.tile.type === 'destination' && contentExists) {
        return (
          <div>
            {this.removeButton(item.id)}
            <div className='clickable'>
              <DestinationTile {...item} />
            </div>
          </div>
        );
      }
    } else if (item.type === 'filter') {
      return (
        <FilterTile
          onYesFilter={onYesFilter}
          onNoFilter={() => removeTile(item.id)}
          description={item.filter}
        />
      );
    }
    return <div/>;
  }

  render () {
    const {
      items,
      searchComplete,
      feedEnd
    } = this.props;
    const searchItems = items.filter(item => !item.related);
    const relatedItems = items.filter(item => item.related);
    const formattedSearchItems = this.mapItems(searchItems);
    const formattedRelatedItems = this.mapItems(relatedItems);
    const message = <div className='feed-end-message'> Here are some other places your might be interested in .... </div>;
    const itemsToDisplay = (searchComplete && feedEnd) ? formattedSearchItems.concat([message]).concat(formattedRelatedItems) : formattedSearchItems;
    return (
      <Masonry
        elementType={'div'}
        options={masonryOptions}
        disableImagesLoaded={false}
        className='grid load-effect'
      >
      {itemsToDisplay}
      </Masonry>
    );
  }
}

SearchResults.propTypes = {
  onYesFilter: PropTypes.func,
  onFilterClick: PropTypes.func,
  items: PropTypes.array,
  setHotelPage: PropTypes.func,
  totalPassengers: PropTypes.number,
  // resultId: PropTypes.string,
  changeRoute: PropTypes.func,
  viewedArticles: PropTypes.array,
  removeTile: PropTypes.func,
  addSingleTag: PropTypes.func,
  searchComplete: PropTypes.bool,
  feedEnd: PropTypes.bool
};

export default SearchResults;

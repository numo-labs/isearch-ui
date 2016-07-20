import React, { PropTypes, Component } from 'react';
import Masonry from 'react-masonry-component';
import FilterTile from '../../../lib/filter-tile';
import PackageTile from '../../../lib/package-tile';
import ArticleTile from '../../../lib/article-tile';
import VisibilitySensor from 'react-visibility-sensor';
import DestinationTile from '../../../lib/destination-tile';
import { addAnalyticsImpression } from '../../../lib/analytics-helper/index';

const removeTileButton = require('../../assets/cancel.svg');
import './style.css';

const masonryOptions = {
  transitionDuration: '0.4s',
  fitWidth: true,
  gutter: 14, // horizontal spacing between tiles
  itemSelector: '.gridItem'
};

class SearchResults extends Component {
  constructor () {
    super();
    this.mapItems = this.mapItems.bind(this);
    this.getRelatedContent = this.getRelatedContent.bind(this);
  }
  shouldComponentUpdate (nextProps) {
    if (nextProps.items.length === this.props.items.length && nextProps.searchComplete === this.props.searchComplete) {
      return false;
    } else {
      return true;
    }
  }

  handleVisibility (isVisible, item) {
    if (!dataLayer || !isVisible) {
      return;
    }
    addAnalyticsImpression(item, dataLayer, impressionsTimestamp);
    return;
  }

  handleClickEvent (item) {
    const clickEventObject = {
      'event': 'productClick',
      'ecommerce': {
        'click': {
          'actionField': { 'list': 'inspirational search feed' },
          'products': []
        }
      }
    };
    if (dataLayer && item.type === 'package') {
      clickEventObject.ecommerce.click.products.push({
        'id': item.packageOffer.provider.reference,
        'brand': 'hotel_tile',
        'dimension11': item.packageOffer.destinationCode,
        'dimension12': item.packageOffer.destinationName,
        'dimension13': item.packageOffer.departureCode
      });
      dataLayer.push(clickEventObject);
    } else if (dataLayer && item.type === 'tile') {
      clickEventObject.ecommerce.click.products.push({
        'id': (item.tile.type === 'article' || item.tile.type === 'destination') ? item.tile.name : item.tile.id,
        'brand': item.tile.type === 'article' ? 'article_tile' : 'destination_tile'
      });
      dataLayer.push(clickEventObject);
    }
    return;
  }

  mapItems (items, start = 0) {
    return (
      items.map((item, index) => {
        if (item.message) {
          return item.message;
        } else {
          return (
            <VisibilitySensor key={start + index} onChange={(isVisible) => this.handleVisibility(isVisible, item)}>
              <div key={index} className='gridItem'>
                {this.renderItem(item, index)}
              </div>
            </VisibilitySensor>
          );
        }
      })
    );
  }

  removeButton (id) {
    const {
      removeTile
    } = this.props;
    return (
      <div onClick={() => removeTile(id)}>
        <img className='removeTileButton' src={removeTileButton} alt='cancelled'/>
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
          <div className='clickable'
               onClick={() => { this.handleClickEvent(item); changeRoute(`/hotel/${item.url}`); }}>
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
            <div className='clickable'
                 onClick={() => { this.handleClickEvent(item); changeRoute(`/article/${item.url}`); }}>
              <ArticleTile
                className={viewedArticles.indexOf(item.tile.id) > -1 ? 'visited' : ''}
                {...item}
                onAddTagClick={(event) => { event.stopPropagation(); addSingleTag(item.tile.name, item.tile.id, item.tile.name); removeTile(item.id); }}
              />
            </div>
          </div>
        );
      } else if (item.tile.type === 'destination' && contentExists) {
        return (
          <div className='shadowHover'>
            {this.removeButton(item.id)}
            <div className='clickable'
                 onClick={() => { this.handleClickEvent(item); changeRoute(`/destination/${item.url}`); }}>
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

  getRelatedContent () {
    const {
      items,
      searchComplete,
      feedEnd
    } = this.props;
    const searchItems = items.filter(item => !item.related);
    const relatedItems = items.filter(item => item.related && item.type !== 'filter');
    const searchItemIds = searchItems.map(item => item.id);
    const uniqueRelatedItems = relatedItems.filter((obj, index) => {
      return searchItemIds.indexOf(obj.id) === -1;
    });
    // we might want to have this depend on the browser language at some point:
    // const message = searchItems.length > 0 ? 'You might also be interested in...' : `Looks like we don't have any results that match your search. But you might be interested in...`;
    const message = searchItems.length > 0
      ? 'Måske er du også interesseret i…'
      : `Din søgning gav ingen resultater, men måske er du interesseret i…`;
    // see: https://github.com/numo-labs/isearch-ui/issues/257
    if (((feedEnd && searchComplete) || (searchItems.length === 0 && searchComplete)) && uniqueRelatedItems.length > 0) {
      return (
        [<div key={'message'} className='feed-end-message'>{message}</div>,
        <Masonry
          elementType={'div'}
          options={masonryOptions}
          disableImagesLoaded={false}
          className='grid load-effect'
        >
        {this.mapItems(uniqueRelatedItems, searchItems.length)}
        </Masonry>]
      );
    }
  }

  render () {
    const {
      searchComplete,
      items
    } = this.props;
    const searchItems = items.filter(item => !item.related);
    const hideGridStyle = {
      minHeight: '0'
    };
    const showGridStyle = {
      minHeight: '80vh'
    };
    const gridStyle = searchComplete && searchItems.length === 0 ? hideGridStyle : showGridStyle;
    return (
      <div>
        <div style={gridStyle}>
          <Masonry
            elementType={'div'}
            options={masonryOptions}
            disableImagesLoaded={false}
            className='grid load-effect'
          >
          {this.mapItems(searchItems)}
          </Masonry>
        </div>
        {this.getRelatedContent()}
      </div>
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

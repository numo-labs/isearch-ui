import React, { PropTypes, Component } from 'react';
import Masonry from 'react-masonry-component';
import FilterTile from '../../../lib/filter-tile';
import PackageTile from '../../../lib/package-tile';
import ArticleTile from '../../../lib/article-tile';
import VisibilitySensor from 'react-visibility-sensor';
import DestinationTile from '../../../lib/destination-tile';
import { addAnalyticsImpression, analyticsRemoveTile } from '../../../lib/analytics-helper/index';
import downArrow from '../../assets/down-arrow.svg';

const removeTileButton = require('../../assets/cancel.svg');
import './style.css';

const masonryOptions = {
  transitionDuration: '0.4s',
  fitWidth: true,
  gutter: 14, // horizontal spacing between tiles
  itemSelector: '.gridItem'
};

function getItemAnalyticsId (item) {
  let id;
  switch (item.type) {
    case 'package':
      id = item.packageOffer.provider.reference;
      break;
    case 'tile':
      id = (item.tile.type === 'article' || item.tile.type === 'destination') ? item.tile.name : item.tile.id;
      break;
    default:
      id = 'error';
  }
  return id;
}

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
        'id': getItemAnalyticsId(item),
        'brand': 'hotel_tile',
        'dimension11': item.packageOffer.destinationCode,
        'dimension12': item.packageOffer.destinationName,
        'dimension13': item.packageOffer.departureCode
      });
      dataLayer.push(clickEventObject);
    } else if (dataLayer && item.type === 'tile') {
      clickEventObject.ecommerce.click.products.push({
        'id': getItemAnalyticsId(item),
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
          item.autoDisplayed = item.related || this.props.isInitialTag;
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

  removeButton (item) {
    const {
      removeTile
    } = this.props;
    return (
      <div onClick={() => {
        dataLayer.push(analyticsRemoveTile(getItemAnalyticsId(item)));
        removeTile(item.id);
      }}>
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
      addArticleTag
    } = this.props;
    if (item.packageOffer) {
      return (
        <div>
          {this.removeButton(item)}
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
            {this.removeButton(item)}
            <div className='clickable'
                 onClick={() => { this.handleClickEvent(item); changeRoute(`/article/${item.url}`); }}>
              <ArticleTile
                className={viewedArticles.indexOf(item.tile.id) > -1 ? 'visited' : ''}
                {...item}
                onAddTagClick={(event) => { event.stopPropagation(); addArticleTag(item.tile.name, item.tile.id); }}
              />
            </div>
          </div>
        );
      } else if (item.tile.type === 'destination' && contentExists) {
        return (
          <div className='shadowHover'>
            {this.removeButton(item)}
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
        [<div className='feed-end-message-container'>
            <div key={'message'} className='feed-end-message'>{message}</div>
            <img src={downArrow} alt='downArrow' className='feedEndDownArrow'/>
        </div>,
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
      items,
      showTravelInfo,
      isInitialTag,
      ranking
    } = this.props;
    const searchItems = items.filter(item => !item.related);
    const hotelItems = ranking ? Object.keys(ranking).filter(key => key.match(/^hotel/)) : [];
    const hideGridStyle = {
      minHeight: '0'
    };
    const showGridStyle = {
      minHeight: '80vh'
    };
    const noHotelsErrorMessage = (
      <div className='noHotelsErrorMessage'>
        <div>Ingen hoteller er ledige i den valgte tidsperiode</div>
        <div className='changeDetailsLink' onClick={() => showTravelInfo()}>Ændre tidsperioden</div>
      </div>
    );
    const gridStyle = searchComplete && searchItems.length === 0 ? hideGridStyle : showGridStyle;
    return (
      <div className='gridContainer'>
        {!isInitialTag && ranking && searchComplete && hotelItems.length === 0 ? noHotelsErrorMessage : ''}
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
  addArticleTag: PropTypes.func,
  searchComplete: PropTypes.bool,
  feedEnd: PropTypes.bool,
  showTravelInfo: PropTypes.func,
  isInitialTag: PropTypes.bool,
  ranking: PropTypes.object
};

export default SearchResults;

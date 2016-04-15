import React, { PropTypes, Component } from 'react';
import Masonry from 'react-masonry-component';
import FilterTile from '../../../lib/filter-tile-yesno';
import PackageTile from '../../../lib/package-tile';
import Article from '../../../lib/article';
import './style.css';

const masonryOptions = {
  transitionDuration: '0.4s',
  itemSelector: '.gridItem',
  fitWidth: true,
  gutter: 14 // horizontal spacing between tiles
};

class SearchResults extends Component {

  render () {
    const { items, filterVisibleState, onYesFilter, onFilterClick, showAddMessage } = this.props;
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
                <div key={index} className='gridItem'>
                  <PackageTile
                    key={item.packageOffer.id}
                    packageOffer={item.packageOffer}
                  />
                </div>
              );
            } else if (item.type === 'filter') {
              console.log('itemVisible', filterVisibleState[item.displayName]);
              return (
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
              );
            } else if (item.type === 'article') {
              return (
                <div key={index} className='gridItem'>
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

SearchResults.propTypes = {
  onYesFilter: PropTypes.func,
  onFilterClick: PropTypes.func,
  showAddMessage: PropTypes.func,
  items: PropTypes.array,
  filterVisibleState: PropTypes.object
};

export default SearchResults;

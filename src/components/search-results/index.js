import React, { PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import FilterTile from 'filter-tile-yesno';
import PackageTile from 'package-tile';
import Article from 'article';

const masonryOptions = {
  transitionDuration: '0.4s',
  itemSelector: '.gridItem',
  fitWidth: true,
  gutter: 14 // horizontal spacing between tiles
};

const SearchResults = React.createClass({
  propTypes: {
    onYesFilter: PropTypes.func,
    onNoFilter: PropTypes.func,
    showAddMessage: PropTypes.func,
    items: PropTypes.array,
    filterVisibleState: PropTypes.object
  },
  render () {
    const { items, filterVisibleState, onYesFilter, onNoFilter, showAddMessage } = this.props;
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
              return (
                <div key={index} className='gridItem'>
                  <FilterTile
                    filterVisible={filterVisibleState[item.bigWord]}
                    onYesFilter={onYesFilter}
                    onNoFilter={onNoFilter}
                    showAddMessage={showAddMessage}
                    description={item} color={item.color}
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
});

export default SearchResults;

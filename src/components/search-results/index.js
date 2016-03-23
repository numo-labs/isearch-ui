import React from 'react';
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
  render () {
    const { items } = this.props;
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

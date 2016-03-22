import React from 'react';
import Masonry from 'react-masonry-component';

const SearchResults = React.createClass({
  render () {
    const { items } = this.props;
    return (
      <Masonry>
        {
          items.map((item, index) => {
            return (
              <div key={index}>
              </div>
            )
          })
        }
      </Masonry>
    );
  }
});

export default SearchResults;

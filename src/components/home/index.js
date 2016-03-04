import React, { PropTypes, Component } from 'react';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 0
};
require('./style.css');
class Gallery extends Component {
  render() {
    return (
      <Masonry
        elementType={'div'} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
      >
        <div className="tile"/>
        <div className="tile"/>
        <div className="tile"/>
        <div className="tile"/>
      </Masonry>
    );
  }
};

export default Gallery;

import React from 'react';
import Tile from './tile';

const categories = ['abstract', 'animals', 'business', 'cats', 'city', 'food', 'nightlife',
  'fashion', 'people', 'nature', 'sports', 'technics', 'transport']

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  getInitialState () {
    const images = [];

    for (var i = 0; i < 100; i++) {
      const cat = categories[Math.floor((Math.random() * 11) + 1)];
      images.push({category: cat, img: 'http://lorempixel.com/600/337/' + cat + '/' + Math.floor((Math.random() * 10) + 1)});
    }

    return {
      images: images
    }
  },

  renderRandomCards (n) {

    const components = [];
    for (var i = 0; i < n; i++) {
      const k = Math.floor((Math.random() * 100) + 1);
      const img = this.state.images[k].img;
      const cat = this.state.images[k].category;
      components.push(
        <div key={i}>
          <Tile img={img} index={i} cat={cat} />
          <br />
        </div>
      )
    }
    return (components);
  },

  render: function () {
    return (
      <div className='greeting'>
        {this.renderRandomCards(10)}
      </div>
    );
  }
});

import React from 'react';
import Tile from './tile';
import AppBar from 'material-ui/lib/app-bar';

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
      images.push('http://lorempixel.com/600/337/' + cat + '/' + Math.floor((Math.random() * 10) + 1));
    }

    return {
      images: images
    }
  },

  renderRandomCards (n) {

    const components = [];
    for (var i = 0; i < n; i++) {
      const img = this.state.images[Math.floor((Math.random() * 100) + 1)];
      components.push(
        <div key={i}>
          <Tile img={img} key={i} />
          <br />
        </div>
      )
    }
    return (components);
  },

  render: function () {
    return (
      <div className='greeting'>
        <AppBar showMenuIconButton={false} title="Inspirational App DEMO" />
        <br />
        {this.renderRandomCards(10)}
      </div>
    );
  }
});

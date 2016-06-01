import React, { Component, PropTypes } from 'react';

require('./style.css');

export class ArticleTile extends Component {
  // shouldComponentUpdate (nextProps) {
  //   if (nextProps.tile.name === this.props.tile.name) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  render () {
    const { tile } = this.props;
    return (
      <div className='articleContainer'>
        <img className='articleImage' src={tile.sections && tile.sections[0].image} />
        <div className='text'>
          <h4>{this.props.overview}</h4>
          <h2>{tile.name}</h2>
        </div>
      </div>
    );
  }
}

ArticleTile.propTypes = {
  overview: PropTypes.string,
  type: PropTypes.string,
  content: PropTypes.object,
  tile: PropTypes.object
};

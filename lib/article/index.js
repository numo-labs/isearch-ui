import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

require('./style.css');

export class ArticleTile extends Component {
  render () {
    const { id, tile, bucketId } = this.props;
    return (
      <Link to={`/article/${bucketId}/${id}`}>
        <div className='articleContainer'>
          <img className='articleImage' src={tile.sections && tile.sections[0].image} />
          <div className='text'>
            <h4>{this.props.overview}</h4>
            <h2>{tile.name}</h2>
          </div>
        </div>
      </Link>
    );
  }
}

ArticleTile.propTypes = {
  window: PropTypes.object,
  backgroundImage: PropTypes.string,
  title: PropTypes.string,
  overview: PropTypes.string,
  type: PropTypes.string,
  content: PropTypes.object,
  viewArticle: PropTypes.func,
  tile: PropTypes.object,
  id: PropTypes.string,
  bucketId: PropTypes.string
};

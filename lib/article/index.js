import React, { Component, PropTypes } from 'react';
import ArticleFooter from './article-footer.js';
import NavHeader from '../nav-header/';
import Tag from '../tags/tag.js';
import { Link } from 'react-router';

require('./style.css');

function moveScrollToTop (w = window) {
  w.scrollTo(0, 0);
}

export class ArticleTile extends Component {
//   onClick={ () => {                        line 23
//   moveScrollToTop(this.props.window);
//   this.props.viewArticle(this.props.tile);
// }}
  render () {
    const { id, tile, bucketId } = this.props;
    return (
      <Link to={`/article/${bucketId}/${id}`}>
        <div className='articleContainer'

        >
          <img className='articleImage' src={tile.sections && tile.sections[0].image} />
          <div className='type'>
            <h5>{tile.tags[tile.tags.length - 1].label}</h5>
          </div>
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
  tile: PropTypes.object
};

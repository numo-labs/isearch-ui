import React, { Component, PropTypes } from 'react';

require('./style.css');

export class ArticleTile extends Component {
  render () {
    const { tile } = this.props;
    return (
      <div className='articleContainer visited'>
        <img className='articleImage' src={tile.sections && tile.sections[0].image} />
        <div className='text'>
          <h3>du har læst</h3>
          <h4>{this.props.overview}</h4>
          <h2>{tile.name}</h2>
        </div>
        <div className='tagField'>
          <div className='tagLabel'>{this.props.articleName}</div>
          <div className='addTagButton' onClick={this.props.onAddTagClick}>+</div>
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

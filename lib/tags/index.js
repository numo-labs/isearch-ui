import React, { Component, PropTypes } from 'react';
import Tag from './tag.js';
require('./style.css');

export const DEFAULT_TAG_ID = 'marketing:homepage.dk.spies';

export default class TagContainer extends Component {

  handleOnClick () {
    this.props.resetTags('Top inspiration', DEFAULT_TAG_ID);
  }

  resetButtonVisibility () {
    return this.props.tags.filter(tag => tag.id !== DEFAULT_TAG_ID).length ? '' : 'hidden';
  }

  render () {
    const {
      tags,
      removeTag
    } = this.props;

    var tagComponents = tags.map(function (tag) {
      const type = tag.id.split(':')[0];
      const colour = type === 'geo' ? '#CEC947' : '#8EB8C4';
      return <Tag
        key={tag.displayName}
        displayName={tag.displayName}
        colour={colour}
        removeTag={removeTag}
      />;
    });
    return (
      <div className='tagWrapper'>
        <div className='tags'>
          {tagComponents}
          <div onClick={this.handleOnClick.bind(this)} className={'resetButton ' + this.resetButtonVisibility()}>
            RESET
          </div>
        </div>
      </div>
    );
  }
}

TagContainer.propTypes = {
  tags: PropTypes.array,
  removeTag: PropTypes.func,
  resetTags: PropTypes.func
};

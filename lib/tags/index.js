import React, { Component, PropTypes } from 'react';
import Tag from './tag.js';
require('./style.css');

export default class TagContainer extends Component {

  handleOnClick () {
    this.props.resetTags();
    this.props.addSingleTag('Top inspiration', 'marketing:homepage.dk.spies', true);
  }

  resetButtonClass () {
    return this.props.tags.filter(tag => tag.id !== 'marketing:homepage.dk.spies').length ? '' : 'hidden';
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
          <div onClick={this.handleOnClick.bind(this)} className={'resetButton ' + this.resetButtonClass()}>
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
  addSingleTag: PropTypes.func,
  resetTags: PropTypes.func
};

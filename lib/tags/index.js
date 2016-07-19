import React, { Component, PropTypes } from 'react';
import Tag from './tag.js';
import DEFAULT_TAG from '../../src/constants/default-tag.js';
require('./style.css');

export default class TagContainer extends Component {

  handleOnClick () {
    dataLayer.push({'event': 'searchpreferenceReset'});
    this.props.resetTags();
  }

  isNonDefaultTag (tag) {
    return tag.id !== DEFAULT_TAG.id;
  }

  resetButtonVisibility () {
    return this.props.tags.filter(this.isNonDefaultTag).length ? '' : 'hidden';
  }

  render () {
    const {
      tags,
      removeTag,
      resetColour,
      resetBackgroundColour,
      resetBorderColour
    } = this.props;
    const resetButtonStyle = {
      color: resetColour,
      backgroundColor: resetBackgroundColour,
      border: '1px solid' + resetBorderColour
    };

    var tagComponents = tags.filter(this.isNonDefaultTag).map(function (tag) {
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
          <div
          onClick={this.handleOnClick.bind(this)}
          className={'resetButton ' + this.resetButtonVisibility()}
          style={resetButtonStyle}
          >
            NULSTIL
          </div>
        </div>
      </div>
    );
  }
}

TagContainer.propTypes = {
  tags: PropTypes.array,
  removeTag: PropTypes.func,
  resetTags: PropTypes.func,
  resetColour: PropTypes.string,
  resetBackgroundColour: PropTypes.string,
  resetBorderColour: PropTypes.string
};

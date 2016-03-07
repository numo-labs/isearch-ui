import React, { Component, PropTypes } from 'react';
import fixtures from './fixtures.js';
import Tag from './tag.js';

require('./style.css');

export default class TagContainer extends Component {
  render () {
    var tags = fixtures.map(function (tag) {
      return <Tag key={tag.tagName} tagName={tag.tagName} colour={tag.colour} />;
    });
    console.log(tags);
    return (
      <div className='tagContainer'>
      {tags}
      {this.props.children}
      </div>

    );
  }
}

TagContainer.propTypes = {
  tagName: PropTypes.string,
  colour: PropTypes.string
};

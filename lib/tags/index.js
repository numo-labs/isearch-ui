import React, { Component, PropTypes } from 'react';
import Tag from './tag.js';

require('./style.css');

export default class TagContainer extends Component {
  onKeyUp (event) {
    event.preventDefault();
    if (event.key === 'Enter') {
      this.props.onSearchButtonClick();
    }
  }
  render () {
    const { tags, removeTag, onSearchButtonClick, setSearchString } = this.props;
    var tagComponents = tags.map(function (tag) {
      return <Tag key={tag.tagName} tagName={tag.tagName} colour={tag.colour} removeTag={removeTag}/>;
    });
    return (
      <div className='tagWrapper'>
        <div className='tagContainer'>
        <div className='inputContainer'>
            <input
             className='inputBar'
             type='text'
             placeholder='Add your vacation preferences!'
             onChange={(e) => setSearchString(e.target.value)}
             onKeyUp={this.onKeyUp.bind(this)}
            />
          <div className='searchButton' onClick={onSearchButtonClick}>+</div>
        </div>
          {tagComponents}
        </div>
      </div>
    );
  }
}

TagContainer.propTypes = {
  tags: PropTypes.array,
  removeTag: PropTypes.func,
  onSearchButtonClick: PropTypes.func,
  setSearchString: PropTypes.func
};

import React, { Component, PropTypes } from 'react';
import Tag from './tag.js';
import Select from 'react-select';
import style from '../../../node_modules/react-select/dist/react-select.css';

require('./style.css');

export default class TagContainer extends Component {
  onKeyUp (event) {
    event.preventDefault();
    if (event.key === 'Enter') {
      this.props.onSearchButtonClick();
    }
  }
  render () {
    const {
      tags,
      removeTag,
      onSearchButtonClick,
      setSearchString
      autocompleteError,
      autocompleteOptions,
      searchString,
      inAutocompleteSearch
    } = this.props;
    var tagComponents = tags.map(function (tag) {
      return <Tag
        key={tag.displayName}
        displayName={tag.displayName}
        colour={tag.colour}
        removeTag={removeTag}
      />;
    });
    return (
      <div className='tagWrapper'>
        <div className='tagContainer'>
        <div className='inputContainer'>
          <Select
            className='inputBar'
            placeholder='Add your vacation preferences!'
            value={searchString}
            onInputChange={(value) => setSearchString(value)}
            isLoading={inAutocompleteSearch}
            options={autocompleteOptions}
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

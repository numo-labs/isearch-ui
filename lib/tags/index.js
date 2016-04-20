import React, { Component, PropTypes } from 'react';
import Tag from './tag.js';
// import debounce from 'lodash.debounce';
var Typeahead = require('react-typeahead').Typeahead;

require('./style.css');

export default class TagContainer extends Component {

  onKeyUp (event) {
    event.preventDefault();
    if (event.key === 'Enter') {
      this.props.onSearchButtonClick();
    }
  }

  handleInputChange (e) {
    const input = e.target.value;
    const { setSearchString, getAutocompleteOptions } = this.props;
    setSearchString(input);
    getAutocompleteOptions(input);
  }

  render () {
    const {
      tags,
      removeTag,
      onSearchButtonClick,
      // autocompleteError,
      autocompleteOptions,
      searchString,
      onOptionSelected
      // inAutoCompleteSearch
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
          <Typeahead
            options={autocompleteOptions}
            value={searchString}
            className='inputBar'
            onKeyUp={this.handleInputChange.bind(this)}
            filterOption='suggestion'
            displayOption='suggestion'
            onOptionSelected={onOptionSelected}
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
  setSearchString: PropTypes.func,
  autocompleteError: PropTypes.string,
  autocompleteOptions: PropTypes.array,
  searchString: PropTypes.string,
  inAutoCompleteSearch: PropTypes.bool,
  getAutocompleteOptions: PropTypes.func,
  onOptionSelected: PropTypes.func
};

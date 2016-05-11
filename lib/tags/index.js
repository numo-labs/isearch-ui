import React, { Component, PropTypes } from 'react';
import Tag from './tag.js';
// var Typeahead = require('react-typeahead').Typeahead;
require('./style.css');

export default class TagContainer extends Component {

  constructor () {
    super();
    this.state = {
      option: {}
    };
  }

  handleInputChange (e) {
    if (e.key === 'Enter') {
      this.onSearchButtonClick();
    }
    const input = e.target.value;
    const { setSearchString, getAutocompleteOptions } = this.props;
    setSearchString(input);
    getAutocompleteOptions(input);
  }

  onSearchButtonClick () {
    const {
      props: { addSingleTag },
      state: { option }
    } = this;
    if (option.tagid && option.label) {
      addSingleTag(option.label, option.tagid);
      this.refs.autocomplete.setState({ entryValue: '' }); // temp fix to clear the search input
      this.setState({ option: {} }); // clear selected option
    }
  }

  render () {
    const {
      tags,
      removeTag
      // autocompleteError,
      // inAutoCompleteSearch
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
        </div>
      </div>
    );
  }
}

TagContainer.propTypes = {
  tags: PropTypes.array,
  removeTag: PropTypes.func,
  addSingleTag: PropTypes.func,

  // search
  setSearchString: PropTypes.func,
  searchString: PropTypes.string,
  startSearch: PropTypes.func,
  clearSearchString: PropTypes.func,

  // autocomplete
  autocompleteError: PropTypes.string,
  autocompleteOptions: PropTypes.array,
  inAutoCompleteSearch: PropTypes.bool,
  getAutocompleteOptions: PropTypes.func
};

import React, { Component, PropTypes } from 'react';
import Tag from './tag.js';
var Typeahead = require('react-typeahead').Typeahead;

require('./style.css');

export default class TagContainer extends Component {

  constructor () {
    super();
    this.state = {
      option: {}
    };
  }

  onKeyUp (event) {
    event.preventDefault();
    if (event.key === 'Enter') {
      this.onSearchButtonClick();
    }
  }

  handleInputChange (e) {
    const input = e.target.value;
    const { setSearchString, getAutocompleteOptions } = this.props;
    setSearchString(input);
    getAutocompleteOptions(input);
  }

  onSearchButtonClick () {
    const {
      props: { addSingleTag, startSearch },
      state: { option }
    } = this;
    if (option.id && option.suggestion) {
      addSingleTag(option.suggestion, option.id);
      startSearch();
      this.refs.autocomplete.setState({ entryValue: '' }); // temp fix to clear the search input
      this.setState({ option: {} });
    }
  }

  onOptionSelected (option) {
    this.setState({ option });
  }

  render () {
    const {
      tags,
      removeTag,
      autocompleteOptions
      // autocompleteError,
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
            ref='autocomplete'
            className='inputBar'
            onKeyUp={this.handleInputChange.bind(this)}
            filterOption='suggestion'
            displayOption='suggestion'
            onOptionSelected={this.onOptionSelected.bind(this)}
            maxVisible={5}
            customClasses={{
              input: 'form-control',
              results: 'list-group input-results',
              listItem: 'list-group-item',
              hover: 'list-group-item__hover active'
            }}
          />
          <div className='searchButton' onClick={this.onSearchButtonClick.bind(this)}>+</div>
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
  onOptionSelected: PropTypes.func,
  addSingleTag: PropTypes.func,
  startSearch: PropTypes.func,
  clearSearchString: PropTypes.func
};

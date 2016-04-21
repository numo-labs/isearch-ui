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
      props: { addSingleTag, startSearch },
      state: { option }
    } = this;
    if (option.id && option.suggestion) {
      addSingleTag(option.suggestion, option.id);
      startSearch();
      this.refs.autocomplete.setState({ entryValue: '' }); // temp fix to clear the search input
      this.setState({ option: {} }); // clear selected option
    }
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
        <div className='tagContainer'>
        <div className='inputContainer'>
          <Typeahead
            options={autocompleteOptions}
            ref='autocomplete'
            className='inputBar'
            onKeyUp={this.handleInputChange.bind(this)}
            filterOption='suggestion'
            displayOption='suggestion'
            onOptionSelected={(option) => this.setState({ option })}
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
          <div className='tags'>
            {tagComponents}
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

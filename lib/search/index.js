import React, { Component, PropTypes } from 'react';
var Typeahead = require('react-typeahead').Typeahead;
require('./style.css');

export default class SearchBarContainer extends Component {

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
      autocompleteOptions
      // autocompleteError,
      // inAutoCompleteSearch
    } = this.props;
    return (
      <div className='searchBarContainer'>
          <div className='inputContainer'>
            <Typeahead
              options={autocompleteOptions}
              ref='autocomplete'
              className='inputBar'
              onKeyUp={this.handleInputChange.bind(this)}
              filterOption='name'
              displayOption='label'
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
      </div>
    );
  }
}

SearchBarContainer.propTypes = {
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

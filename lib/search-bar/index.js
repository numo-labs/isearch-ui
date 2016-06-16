import React, { Component, PropTypes } from 'react';
var Typeahead = require('react-typeahead').Typeahead;
var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;
import './style.css';
export default class SearchBarContainer extends Component {

  constructor () {
    super();
    this.state = {
      option: {}
    };
  }

  handleOnOptionSelected (option) {
    this.setState({ option }, () => {
      this.onSearchButtonClick();
    });
    this.onSearchButtonClick();
    document.activeElement.blur();
  }

  onInputFocus (e) {
    e.preventDefault();
    if (window.innerWidth > 535 && (window.scrollY < window.innerHeight / 2)) {
      scroll.scrollTo(window.innerHeight / 3);
    }
  }

  handleInputChange (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      this.onSearchButtonClick();
      document.activeElement.blur();
    }
    const input = e.target.value;
    const { setSearchString, getAutocompleteOptions } = this.props;
    setSearchString(input);
    getAutocompleteOptions(input);
    this.onSearchButtonClick();
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
    } = this.props;
    return (
      <div className='searchBarContainer'>
          <div className='inputContainer'>
            <Typeahead
              onFocus={this.onInputFocus.bind(this)}
              options={autocompleteOptions}
              ref='autocomplete'
              className='inputBar'
              onKeyUp={this.handleInputChange.bind(this)}
              filterOption='name'
              displayOption='label'
              onOptionSelected={(option) => { this.handleOnOptionSelected(option); }}
              maxVisible={5}
              customClasses={{
                input: 'form-control',
                results: 'list-group input-results',
                listItem: 'list-group-item',
                hover: 'list-group-item__hover active'
              }}
              placeholder='Tilføj til din rejse præferencer'
            />
        </div>
      </div>
    );
  }
}

SearchBarContainer.propTypes = {
  addSingleTag: PropTypes.func,

  // search
  setSearchString: PropTypes.func,
  startSearch: PropTypes.func,

  // autocomplete
  autocompleteOptions: PropTypes.array,
  getAutocompleteOptions: PropTypes.func
};

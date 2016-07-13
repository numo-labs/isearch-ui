import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import defaultSuggestions from './defaultSuggestions';
var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;
import './style.css';

let keyPressTimeout;

function getSuggestionValue (suggestion) {
  return suggestion.name;
}

function renderSuggestion (suggestion) {
  return (
      <div className='suggestionItem'>{suggestion.label}</div>
  );
}

function getSectionSuggestions (section) {
  return section.suggestions;
}

function renderSectionTile (section) {
  return (
    <div className='sectionItem'>
      <div className='noSuggestion'>
        {section.title}
      </div>
      <div className='tryThis'>
        {section.subTitle}
      </div>
    </div>
  );
}

export default class SearchBarContainer extends Component {

  constructor () {
    super();
    this.state = {
      option: {},
      value: '',
      suggestions: [],
      isLoading: false,
      multiSection: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  handleOnOptionSelected (option) {
    this.setState({ option }, () => {
      this.onSearchButtonClick();
    });
    this.onSearchButtonClick();
    document.activeElement.blur();
    this.setState({value: '', suggestions: []});
    if (this.props.tagView) {
      this.props.go(-1);
    }
  }

  onInputFocus (e) {
    e.preventDefault();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const screenHeight = document.documentElement.clientHeight;
    if (window.innerWidth > 535 && (scrollY < screenHeight / 2) && screenHeight > 705) {
      scroll.scrollTo(screenHeight / 3);
    }
  }

  handleInputChange (e) {
    const input = e.target.value;
    clearTimeout(keyPressTimeout);
    keyPressTimeout = setTimeout(() => {
      const analyticsObject = {
        event: 'searchTyping',
        searchInput: input
      };
      dataLayer.push(analyticsObject);
    }, 3000);
    if (e.key === 'Enter' || e.keyCode === 13) {
      this.onSearchButtonClick();
      document.activeElement.blur();
      if (this.props.tagView) {
        this.props.go(-1);
      }
    }
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

  onChange (event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsUpdateRequested ({ value }) {
    this.setState({
      isLoading: true
    });
    const { setSearchString, getAutocompleteOptions } = this.props;
    setSearchString(value);
    getAutocompleteOptions(value).then(() => {
      const autocompleteOptions = this.props.autocompleteOptions.length ? this.props.autocompleteOptions : defaultSuggestions;
      const multiSection = !this.props.autocompleteOptions.length;

      this.setState({
        suggestions: (value === this.state.value) ? autocompleteOptions : [],
        isLoading: false,
        multiSection: multiSection
      });
    });
  }

  render () {
    const { value, suggestions, multiSection } = this.state;

    const inputProps = {
      placeholder: 'Tilføj til din rejse præferencer',
      value,
      onChange: this.onChange,
      className: 'searchBox',
      type: 'search'
    };

    return (
      <div className='searchBarContainer'>
        <div className='inputContainer'>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            focusInputOnSuggestionClick={false}
            onSuggestionSelected={(event, { suggestion }) => this.handleOnOptionSelected(suggestion) }
            multiSection={multiSection}
            renderSectionTitle={renderSectionTile}
            getSectionSuggestions={getSectionSuggestions}
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
  getAutocompleteOptions: PropTypes.func,

  // navigation
  go: PropTypes.func,
  tagView: PropTypes.bool
};

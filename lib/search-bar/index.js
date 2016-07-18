import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import { noSuggestions, defaultSuggestions } from './defaultSuggestions';
var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;
import './style.css';
let counter = 0;
const searchIcon = require('../../src/assets/search.svg');

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

function renderTitle (title) {
  if (!title) return;
  return (
    <div className='noSuggestion'>
      {title}
    </div>
  );
}

function renderSectionTile (section) {
  return (
    <div className='sectionItem'>
      { renderTitle(section.title) }
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
      multiSection: false,
      placeholder: 'Tilføj til din rejse præferencer'
    };
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.onFocus = this.onFocus.bind(this);
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

  onSearchButtonClick () {
    const {
      props: { addSingleTag },
      state: { option }
    } = this;
    if (option.tagid && option.label) {
      addSingleTag(option.label, option.tagid);
      this.setState({ option: {}, value: '', suggestions: [], multiSection: false, isLoading: false });
      scroll.scrollTo(window.innerHeight * 0.95);
    }
  }

  onChange (event, { newValue }) {
    this.setState({
      value: newValue
    });
    const { getAutocompleteOptions } = this.props;
    getAutocompleteOptions(newValue).then(() => {
      clearTimeout(keyPressTimeout);
      keyPressTimeout = setTimeout(() => {
        const analyticsObject = {
          event: 'searchTyping',
          searchInput: newValue,
          suggestions: this.props.autocompleteOptions ? this.props.autocompleteOptions.length : 0
        };
        dataLayer.push(analyticsObject);
      }, 3000);
    });
  }

  onFocus () {
    const autocompleteOptions = this.props.autocompleteOptions.length ? this.props.autocompleteOptions : defaultSuggestions;
    this.setState({
      suggestions: autocompleteOptions,
      isLoading: false,
      multiSection: !this.props.autocompleteOptions.length
    });
  }

  onSuggestionsUpdateRequested ({ value }) {
    this.setState({
      isLoading: true
    });
    const { setSearchString, getAutocompleteOptions } = this.props;
    setSearchString(value);
    getAutocompleteOptions(value).then(() => {
      const autocompleteOptions = this.props.autocompleteOptions.length ? this.props.autocompleteOptions : noSuggestions;
      const multiSection = !this.props.autocompleteOptions.length;

      this.setState({
        suggestions: (value === this.state.value) ? autocompleteOptions : [],
        isLoading: false,
        multiSection: multiSection
      });
    });
  }

  placeholderSwitch () {
    const placeholders = ['All inclusive...', 'Croatia...', 'Pool...', 'Thailand...', 'Vietnam...', 'Wifi...'];
    this.setState({
      placeholder: placeholders[counter]
    });
    counter++;
    if (counter === placeholders.length) {
      counter = 0;
    }
  }
  componentDidMount () {
    setInterval(this.placeholderSwitch.bind(this), 2000);
  }

  render () {
    const { value, suggestions, multiSection, placeholder } = this.state;
    const { departureDate, showTravelInfo } = this.props;
    const inputProps = {
      placeholder: placeholder,
      value,
      onChange: this.onChange,
      className: 'searchBox',
      type: 'search',
      onFocus: this.onFocus
    };
    return (
      <div className='searchBarContainer'>
        <div className='inputContainer'>
          <img src={searchIcon} className='searchIcon' alt='search'/>
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
            shouldRenderSuggestions={() => true}
          />
          <div className='travelInfoChange' onClick={() => showTravelInfo()}>
            <div className='leavingDate'>{`Tidigste afrejse: ` + departureDate}</div>
            <div className='leavingDateChangeButton'>Ændre</div>
          </div>
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
  departureDate: PropTypes.func,
  showTravelInfo: PropTypes.func,

  // autocomplete
  autocompleteOptions: PropTypes.array,
  getAutocompleteOptions: PropTypes.func,

  // navigation
  go: PropTypes.func,
  tagView: PropTypes.bool
};

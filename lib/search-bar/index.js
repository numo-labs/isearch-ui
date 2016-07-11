import React, { Component, PropTypes } from 'react';
var Typeahead = require('react-typeahead').Typeahead;
var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;
import './style.css';
let counter = 0;

let keyPressTimeout;
export default class SearchBarContainer extends Component {

  constructor () {
    super();
    this.state = {
      option: {},
      placeholder: 'Tilføj til din rejse præferencer'
    };
  }

  handleOnOptionSelected (option) {
    this.setState({ option }, () => {
      this.onSearchButtonClick();
    });
    this.onSearchButtonClick();
    document.activeElement.blur();
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
              placeholder={this.state.placeholder}
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

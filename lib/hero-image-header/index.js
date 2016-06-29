import React, { Component, PropTypes } from 'react';
import SearchBar from '../search-bar';
import heroImages from '../../src/constants/heroImages';
const signpost = require('../../src/assets/goingplaces.svg');
const bouncingArrow = require('../../src/assets/down-arrow.svg');
var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;
import './style.css';
const random = Math.floor(Math.random() * heroImages.length);
const heroImageUrl = heroImages[random];

export default class Header extends Component {
  constructor () {
    super();
    this.state = {
      gridItemsDisplayed: true
    };
  }
  handleOnArrowClick () {
    scroll.scrollTo(window.innerHeight - 56);
  }
  render () {
    const wrapperStyle = {
      backgroundImage: `url(${heroImageUrl})`
    };
    const {
      addSingleTag,
      startSearch,
      setSearchString,
      autocompleteError,
      autocompleteOptions,
      searchString,
      getAutocompleteOptions,
      inAutoCompleteSearch,
      clearSearchString,
      searchBar,
      displayedItems
    } = this.props;
    return (
      <div className='headerBarWrapper' style={wrapperStyle}>
        <div className='headerBarContainer'>
          <div className='headerContent'>
            <img src={signpost} className='headerIcon'/>
            <h1 className='spies'>Hvor vil du rejse hen?</h1>
            {
              searchBar && <SearchBar
                className='headerSearchBar'
                addSingleTag={addSingleTag}
                startSearch={startSearch}
                setSearchString={setSearchString}
                autocompleteError={autocompleteError}
                autocompleteOptions={autocompleteOptions}
                searchString={searchString}
                getAutocompleteOptions={getAutocompleteOptions}
                inAutoCompleteSearch={inAutoCompleteSearch}
                clearSearchString={clearSearchString}
              />
            }
            {
              displayedItems.length > 0 && <div className='bouncingArrowContainer'>
                  <img
                   className='bouncingArrow'
                   src={bouncingArrow}
                   alt='downArrow'
                   onClick={this.handleOnArrowClick.bind(this)}
                  />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  addSingleTag: PropTypes.func,

  // search
  setSearchString: PropTypes.func,
  searchString: PropTypes.string,
  startSearch: PropTypes.func,
  clearSearchString: PropTypes.func,
  displayedItems: PropTypes.array,

  // autocomplete
  autocompleteError: PropTypes.string,
  autocompleteOptions: PropTypes.array,
  inAutoCompleteSearch: PropTypes.bool,
  getAutocompleteOptions: PropTypes.func,

  searchBar: PropTypes.bool
};

export default Header;

import React, { Component, PropTypes } from 'react';
var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;
require('./style.css');
const signpost = require('../../src/assets/goingplaces.svg');
const bouncingArrow = require('../../src/assets/down-arrow.svg');
import SearchBar from '../search-bar';
export default class Header extends Component {
  handleOnArrowClick () {
    scroll.scrollTo(window.innerHeight / 3);
  }
  render () {
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
      searchBar
    } = this.props;
    return (
      <div className='headerBarWrapper'>
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
            <div className='bouncingArrowContainer'>
              <img
               className='bouncingArrow'
               src={bouncingArrow}
               alt='downArrow'
               onClick={this.handleOnArrowClick.bind(this)}
              />
            </div>
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

  // autocomplete
  autocompleteError: PropTypes.string,
  autocompleteOptions: PropTypes.array,
  inAutoCompleteSearch: PropTypes.bool,
  getAutocompleteOptions: PropTypes.func,

  searchBar: PropTypes.bool
};

export default Header;

import React, { Component, PropTypes } from 'react';
require('./style.css');
const signpost = require('../../src/assets/goingplaces.svg');
import SearchBar from '../search-bar';
export default class Header extends Component {
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
              <img className='bouncingArrow' src='../../src/assets/down-arrow.svg' alt='downArrow' />
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

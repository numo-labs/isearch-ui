import React, { Component, PropTypes } from 'react';
import SearchBar from '../search-bar';
import heroImages from '../../src/constants/heroImages';
import Tags from '../tags';
import './style.css';
const random = Math.floor(Math.random() * heroImages.length);
const heroImageUrl = heroImages[random];

export default class Header extends Component {
  constructor () {
    super();
    this.state = {
      gridItemsDisplayed: true,
      screenWidth: window.innerWidth
    };
  }
  render () {
    const wrapperStyle = {
      backgroundImage: `url(${heroImageUrl[0]})`,
      backgroundColor: `${heroImageUrl[1]}`
    };
    const {
      tags,
      removeTag,
      resetTags,
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
      departureDate,
      showTravelInfo
    } = this.props;
    return (
      <div className='headerBarWrapper' style={wrapperStyle}>
        <div className='headerBarContainer'>
          <div className='headerContent'>
            <h1 className='spies'>Lad os inspirere dig</h1>
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
                tagView={false}
                departureDate={departureDate}
                showTravelInfo={showTravelInfo}
              />
            }
            { (window.innerWidth > 750) && <Tags
              tags={tags}
              removeTag={removeTag}
              resetTags={resetTags}
              resetColour={'#ffffff'}
              resetBackgroundColour={'#F39110'}
              resetBorderColour={'#F39110'}
            />

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

  // tags
  removeTag: PropTypes.func,
  tags: PropTypes.array,
  resetTags: PropTypes.func,

  searchBar: PropTypes.bool,
  departureDate: PropTypes.string,
  showTravelInfo: PropTypes.func
};

export default Header;

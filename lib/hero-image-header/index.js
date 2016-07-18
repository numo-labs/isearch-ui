import React, { Component, PropTypes } from 'react';
import SearchBar from '../search-bar';
import heroImages from '../../src/constants/heroImages';
import Tags from '../tags';
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
      gridItemsDisplayed: true,
      screenWidth: window.innerWidth
    };
  }
  handleOnArrowClick () {
    scroll.scrollTo(window.innerHeight * 0.95);
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
      displayedItems,
      departureDate,
      showTravelInfo
    } = this.props;
    return (
      <div className='headerBarWrapper' style={wrapperStyle}>
        <div className='headerBarContainer'>
          <div className='headerContent'>
            <img src={signpost} className='headerIcon'/>
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
              resetColour={'#F39110'}
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

  // tags
  removeTag: PropTypes.func,
  tags: PropTypes.array,
  resetTags: PropTypes.func,

  searchBar: PropTypes.bool,
  departureDate: PropTypes.string,
  showTravelInfo: PropTypes.func
};

export default Header;

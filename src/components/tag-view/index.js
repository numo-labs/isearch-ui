import React, { Component, PropTypes } from 'react';
import Searchbar from '../../../lib/search-bar';
import Tags from '../../../lib/tags';
import { Link } from 'react-router';
const closeImage = require('../../../src/assets/close-white.svg');

export default class TagView extends Component {
  handleOnClick () {
    const { go } = this.props;
    // if statement checks if the browser is safari
    // using go(-2) for safari instead of go(-1) because it hangs
    if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
      go(-2);
    } else {
      go(-1);
    }
  }
  render () {
    const {
      addSingleTag,
      startSearch,
      setSearchString,
      autocompleteOptions,
      searchString,
      getAutocompleteOptions,
      inAutoCompleteSearch,
      clearSearchString,
      tags,
      removeTag,
      resetTags
     } = this.props;
    return (
      <div className='blueContainer'>
        <div className={'tagViewActive dropDown'}>
          <Link to='/' onClick={this.handleOnClick.bind(this)}>
            <img
              src={closeImage}
              alt='exit button'
              className='tagExitButton'
            />
          </Link>
          <Searchbar
            addSingleTag={addSingleTag}
            startSearch={startSearch}
            setSearchString={setSearchString}
            autocompleteOptions={autocompleteOptions}
            searchString={searchString}
            getAutocompleteOptions={getAutocompleteOptions}
            inAutoCompleteSearch={inAutoCompleteSearch}
            clearSearchString={clearSearchString}
           />
           <Tags
             tags={tags}
             removeTag={removeTag}
             resetTags={resetTags}
             resetColour={'#ffffff'}
           />
        </div>
      </div>
    );
  }
}

TagView.propTypes = {
  go: PropTypes.func,
  addSingleTag: PropTypes.func,
  startSearch: PropTypes.func,
  setSearchString: PropTypes.func,
  autocompleteOptions: PropTypes.array,
  searchString: PropTypes.string,
  getAutocompleteOptions: PropTypes.func,
  inAutoCompleteSearch: PropTypes.bool,
  clearSearchString: PropTypes.func,
  tags: PropTypes.array,
  removeTag: PropTypes.func,
  resetTags: PropTypes.func
};

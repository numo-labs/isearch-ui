import React, { Component, PropTypes } from 'react';

require('./style.css');

export default class SearchBar extends Component {
  render () {
    const { searchString, setSearchString, onSearchButtonClick } = this.props;
    console.log(this.props);
    return (
      <div className='searchBarContainer'>
        <div className='searchContent'>
          <img className='logo' src='https://cloud.githubusercontent.com/assets/12450298/13631826/8a5cb062-e5de-11e5-8b73-f2ec9d622d5f.png' />
          <h1 className='spies'>SPIES</h1>
        </div>
        <div>
          <div className='inspiration'>Inspiration</div>
        </div>
        <div className='inputContainer'>
          <form>
            <input
             className='inputBar'
             type='text'
             placeholder='Find your perfect holiday...'
             onChange={(e) => setSearchString(e.target.value)}
            />
          </form>
          <div className='searchButton' onClick={onSearchButtonClick}>Search</div>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  disableClick: PropTypes.bool
  onSearchButtonClick: PropTypes.func.isRequired,
  searchString: PropTypes.string,
  setSearchString: PropTypes.func
};

export default SearchBar;

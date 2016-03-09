import React, { Component } from 'react';

require('./style.css');

export default class SearchBar extends Component {
  render () {
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
            <input className='inputBar' type='search' placeholder='make a wish...' onfocus={this.placeholder = ''} onblur="this.placeholder = 'make a wish...'"/>
          </form>
          <div className='searchButton'>Search</div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import SearchBar from 'search-bar';

const ISearch = React.createClass({

  handleOnButtonClick () {
    console.log('clicked button');
  },

  render () {
    return (
      <section className='container'>
        <SearchBar onButtonClick={this.handleOnButtonClick.bind(this)} />
      </section>
    );
  }
});

export default ISearch;

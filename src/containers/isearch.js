import React from 'react';
import SearchBar from '../../lib/search-bar';
import SearchSummary from '../../lib/search-summary';
import Tags from '../../lib/tags';

const ISearch = React.createClass({

  handleOnButtonClick () {
    console.log('clicked button');
  },

  render () {
    return (
      <section className='container'>
        <SearchBar onButtonClick={this.handleOnButtonClick} />
        <SearchSummary
          city='Bodrum'
          country='Turkey'
          durationInWeeks={2}
          paxMix='2 adults, 2 children'
          departureDate='Sun 13 jul 2016'
          returnDate='Tue 15 jul 2016'
         />
         <Tags />
      </section>
    );
  }
});

export default ISearch;

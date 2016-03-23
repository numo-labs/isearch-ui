import React from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../lib/search-bar';
import SearchSummary from '../../lib/search-summary';
import Tags from '../../lib/tags';
import SearchResults from '../components/search-results';

import * as TagActions from '../actions/tags';
import * as SearchActions from '../actions/search-results';
const Actions = {...TagActions, ...SearchActions};

export const ISearch = React.createClass({

  componentDidMount () {
    this.generateMockedTags();
    this.fetchQueryResults();
  },

  /**
   * For testing and building purposes we pass through a list of fixed tags.
   * TODO: Replace this with the proper solution!
   */
  generateMockedTags () {
    this.props.addTags([
      {
        tagName: 'this',
        colour: 'red'
      },
      {
        tagName: 'is',
        colour: 'green'
      },
      {
        tagName: 'sparta',
        colour: 'pink'
      }
    ])
  },

  fetchQueryResults () {
    this.props.fetchQuerySearchResults(12345, 1, 20);
  },

  handleOnButtonClick () {
    console.log('clicked button');
  },

  handleOnRemoveTag (tagName) {
    console.log('Removing tag', tagName);
  },

  render () {
    const { tags, addTags, items } = this.props;
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
         <Tags tags={tags} removeTag={this.handleOnRemoveTag} />
         <SearchResults items={items} />
      </section>
    );
  }
});

function mapStateToProps (state) {
    const { tags: { tags }, search: { items } } = state;
    return {
      tags,
      items
    };
}

export default connect(mapStateToProps, Actions)(ISearch);

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../lib/search-bar';
import SearchSummary from '../../lib/search-summary';
import Tags from '../../lib/tags';
import SearchResults from '../components/search-results';

import * as TagActions from '../actions/tags';
import * as SearchActions from '../actions/search-results';
import * as TileActions from '../actions/tiles';
import * as HomeActions from '../actions/home';

const Actions = {...TagActions, ...SearchActions, ...TileActions};
const instagramPrefix = 'https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xpf1/t51.12885-15/';

export const ISearch = React.createClass({
  propTypes: {
    tags: PropTypes.array,
    addTags: PropTypes.func,
    items: PropTypes.array,
    onYesFilter: PropTypes.func,
    onFilterClick: PropTypes.func,
    showAddMessage: PropTypes.func,
    hideAddMessage: PropTypes.func,
    filterVisibleState: PropTypes.object,
    tiles: PropTypes.array
  },

  componentDidMount () {
    this.generateMockedTags();
    this.generateMockTiles();
    this.fetchQueryResults();
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.items !== this.props.items) {
    }
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

  generateMockTiles () {
    this.props.addTiles([
      {
        type: 'article',
        backgroundImage: `${instagramPrefix}s750x750/sh0=108/e35/12479379_141330706245237_420500081_n.jpg`,
        label: 'Sun and Bathe',
        title: '10 TURKISH GEMS',
        overview: 'CLOSE TO BEACH AND CITY',
      },
      {
        backgroundImage: `${instagramPrefix}e35/10472010_1689478414643553_296617682_n.jpg`,
        label: 'Explore',
        title: 'TURKEY',
        overview: '5 HIDDEN SECRETS OF',
        type: 'article'
      },
      {
        part1: 'Are you looking for',
        bigWord: 'Sport & Adventure',
        type: 'filter',
        color: '#DC3767'
      },
      {
        part1: 'Are you looking to see the',
        bigWord: 'Sights',
        type: 'filter',
        color: '#8EB8C4'
      },
      {
        part1: 'Are you looking for good',
        bigWord: 'Food & Drink',
        type: 'filter',
        color: '#F39110'
      },
      {
        part1: 'Are you looking for',
        bigWord: 'Nightlife',
        type: 'filter',
        color: '#81C8BE'
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

  shuffleMockedTilesIntoResultSet (items) {
    if (items.length) {
      return this.addTilesToSearchResult(items, 2, Math.floor((items.length + 6) / 6), 0);
    } else {
      return items;
    }
  },

  addTilesToSearchResult (items, position, index, count) {
    console.log('*********', this.props.tiles);
    items.splice(position, 0, this.props.tiles[count]);
    if (count === 5) {
      return items;
    } else {
      return this.addTilesToSearchResult(items, position + index, index, ++count);
    }
  },

  render () {
    const {
      tags,
      addTags,
      items,
      onYesFilter,
      onFilterClick,
      showAddMessage,
      hideAddMessage,
      filterVisibleState,
      tiles
    } = this.props;
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
        <SearchResults
          items={this.shuffledTiles}
          onYesFilter={onYesFilter}
          onNoFilter={onFilterClick}
          filterVisibleState={filterVisibleState}
          showAddMessage={showAddMessage}
        />
      </section>
    );
  }
});

function mapStateToProps (state) {
    const { tags: { tags }, search: { items }, tiles: { tiles, filterVisibleState } } = state;
    return {
      tags,
      items,
      tiles,
      filterVisibleState
    };
}

export default connect(mapStateToProps, Actions)(ISearch);

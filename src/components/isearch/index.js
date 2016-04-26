import React, { PropTypes, Component } from 'react';
import Header from '../../../lib/header/';
import SearchSummary from '../../../lib/search-summary/';
import Tags from '../../../lib/tags/';
import SearchResults from '../search-results';
import HotelPage from '../../../lib/hotel-page';
import LoadingSpinner from '../../../lib/spinner4';
import { ArticleFullPage } from '../../../lib/article';
import './style.css';

class ISearch extends Component {

  constructor () {
    super();
    this.fetchQueryResults = this.fetchQueryResults.bind(this);
  }

  componentWillMount () {
    this.fetchQueryResults();
  }

  /**
   * For testing and building purposes we pass through a list of fixed tags.
   * TODO: Replace this with the proper solution!
   */

   fetchQueryResults () {
     this.props.fetchQuerySearchResults('8aeb3560-0b92-11e6-9605-eb677966096c', 1, 20, 1);
     this.props.addSingleTag('Canary Islands', 'geo:geonames.2593110');
   }

  renderResults () {
    const {
      displayedItems,
      onYesFilter,
      onFilterClick,
      filterVisibleState,
      viewHotel,
      viewArticle,
      setHotelPage
    } = this.props;

    return (
      <SearchResults
        items={displayedItems}
        onYesFilter={onYesFilter}
        onFilterClick={onFilterClick}
        filterVisibleState={filterVisibleState}
        // showAddMessage={showAddMessage}
        viewArticle={viewArticle}
        viewHotel={viewHotel}
        setHotelPage={setHotelPage}
      />
    );
  }

  render () {
    const {
      tags,
      removeTag,
      setSearchString,
      startSearch,
      autocompleteError,
      autocompleteOptions,
      searchString,
      getAutocompleteOptions,
      inAutoCompleteSearch,
      addSingleTag,
      clearSearchString,
      backToSearch,
      articlePage,
      articleContent,
      error,
      loading,
      hotelPage,
      hotelInView
    } = this.props;

    if (hotelPage) {
      return (
        <HotelPage
          backToSearch={backToSearch}
          packageOffer={hotelInView}
        />
      );
    } else if (articlePage) {
      return (
        <ArticleFullPage
          articleContent={articleContent}
          backToSearch={backToSearch}
        />
      );
    } else {
      return (
        <section>
          <SearchSummary
            city='Bodrum'
            country='Turkey'
            durationInWeeks={2}
            paxMix='2 adults, 2 children'
            departureDate='Sun 13 jul 2016'
            returnDate='Tue 15 jul 2016'
          />
          <Header />
          <Tags
            tags={tags}
            removeTag={removeTag}
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
          { loading &&
            <div className='spinnerContainer'>
              <LoadingSpinner/>
            </div>
          }
          { error && <div className='errorMessage'>{error}</div> }
          { this.renderResults() }
        </section>
      );
    }
  }
}

ISearch.propTypes = {
  // for random initial results
  fetchQuerySearchResults: PropTypes.func,

  // results
  loading: PropTypes.bool,
  error: PropTypes.string,
  displayedItems: PropTypes.array,
  onYesFilter: PropTypes.func,
  onFilterClick: PropTypes.func,
  filterVisibleState: PropTypes.object,

  // autocomplete
  autocompleteError: PropTypes.string,
  autocompleteOptions: PropTypes.array,
  inAutoCompleteSearch: PropTypes.bool,
  getAutocompleteOptions: PropTypes.func,

  // search bar
  clearSearchString: PropTypes.func,
  setSearchString: PropTypes.func,
  searchString: PropTypes.string,
  startSearch: PropTypes.func,
  viewArticle: PropTypes.func,
  backToSearch: PropTypes.func,
  articlePage: PropTypes.bool,
  articleContent: PropTypes.object,
  addSearchStringTag: PropTypes.func,
  hotelPage: PropTypes.bool,
  viewHotel: PropTypes.func,

  // tags
  tags: PropTypes.array,
  addSingleTag: PropTypes.func,
  removeTag: PropTypes.func,
  setHotelPage: PropTypes.func,
  hotelInView: PropTypes.object

  // showAddMessage: PropTypes.func,
  // hideAddMessage: PropTypes.func,
};

export default ISearch;

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
     this.props.addTag('Canary Islands', 'geo:geonames.2593110');
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
      hotelInView,
      numberOfChildren,
      numberOfAdults,
      childAge1,
      childAge2,
      childAge3,
      childAge4,
      departureAirport,
      duration,
      departureDate,
      setNumberOfChildren,
      setNumberOfAdults,
      setChildAge,
      setDepartureAirport,
      setDuration,
      setDurationTitle,
      setNumberOfAdultsTitle,
      setNumberOfChildrenTitle,
      numberOfChildrenTitle,
      numberOfAdultsTitle,
      durationTitle,
      setDepartureDate
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
            numberOfChildren={numberOfChildren}
            numberOfAdults={numberOfAdults}
            setChildAge={setChildAge}
            childAge1={childAge1}
            childAge2={childAge2}
            childAge3={childAge3}
            childAge4={childAge4}
            departureAirport={departureAirport}
            duration={duration}
            departureDate={departureDate}
            setNumberOfChildren={setNumberOfChildren}
            setNumberOfAdults={setNumberOfAdults}
            setDepartureAirport={setDepartureAirport}
            setDuration={setDuration}
            setDurationTitle={setDurationTitle}
            setNumberOfAdultsTitle={setNumberOfAdultsTitle}
            setNumberOfChildrenTitle={setNumberOfChildrenTitle}
            numberOfAdultsTitle={numberOfAdultsTitle}
            numberOfChildrenTitle={numberOfChildrenTitle}
            durationTitle={durationTitle}
            setDepartureDate={setDepartureDate}
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
  addTag: PropTypes.func,
  addSingleTag: PropTypes.func,
  removeTag: PropTypes.func,
  setHotelPage: PropTypes.func,
  hotelInView: PropTypes.object,

  // travel info
  setNumberOfChildren: PropTypes.func,
  setNumberOfAdults: PropTypes.func,
  setDepartureAirport: PropTypes.func,
  setDuration: PropTypes.func,
  numberOfChildren: PropTypes.string,
  numberOfAdults: PropTypes.string,
  childAge1: PropTypes.string,
  childAge2: PropTypes.string,
  childAge3: PropTypes.string,
  childAge4: PropTypes.string,
  departureAirport: PropTypes.string,
  duration: PropTypes.string,
  departureDate: PropTypes.string,
  setChildAge: PropTypes.func,
  setNumberOfAdultsTitle: PropTypes.func,
  setNumberOfChildrenTitle: PropTypes.func,
  setDurationTitle: PropTypes.func,
  numberOfAdultsTitle: PropTypes.string,
  numberOfChildrenTitle: PropTypes.string,
  durationTitle: PropTypes.string,
  setDepartureDate: PropTypes.func

  // showAddMessage: PropTypes.func,
  // hideAddMessage: PropTypes.func,
};

export default ISearch;

import React, { PropTypes, Component } from 'react';
import Header from '../../../lib/hero-image-header/';
import SearchSummary from '../../../lib/search-summary';
import Tags from '../../../lib/tags/';
import SearchResults from '../search-results';
import HotelPage from '../hotel';
import LoadingSpinner from '../../../lib/spinner';
import SearchBar from '../../../lib/search-bar';
import './style.css';

class ISearch extends Component {

  constructor () {
    super();
    this.state = {
      screenWidth: window.innerWidth
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentWillMount () {
    this.props.addSingleTag('Top inspiration', 'marketing:homepage.dk.spies', true);
    window.addEventListener('resize', this.handleResize);
  }
  handleResize () {
    this.setState({screenWidth: window.innerWidth});
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }
  renderResults () {
    const {
      displayedItems,
      onYesFilter,
      onFilterClick,
      filterVisibleState,
      viewHotel,
      viewArticle,
      setHotelPage,
      numberOfChildrenTitle,
      numberOfAdultsTitle,
      bucketId,
      push: changeRoute
    } = this.props;
    return (
      <SearchResults
        changeRoute={changeRoute}
        items={displayedItems}
        onYesFilter={onYesFilter}
        onFilterClick={onFilterClick}
        filterVisibleState={filterVisibleState}
        viewArticle={(article) => {
          this.setState({scrollY: window.scrollY});
          window.scrollTo(0, 0);
          viewArticle(article);
        }}
        viewHotel={(hotel) => {
          this.setState({scrollY: window.scrollY});
          viewHotel(hotel);
        }}
        setHotelPage={setHotelPage}
        totalPassengers={Number(numberOfAdultsTitle) + Number(numberOfChildrenTitle)}
        bucketId={bucketId}
      />
    );
  }

  render () {
    const {
      tags,
      removeTag,
      setSearchString,
      startSearch,
      autocompleteOptions,
      searchString,
      getAutocompleteOptions,
      inAutoCompleteSearch,
      addSingleTag,
      clearSearchString,
      backToSearch,
      // articlePage,
      // articleContent,
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
      updateHeaderTitles,
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
    // } else if (articlePage) {
    //   return (
    //     <ArticleFullPage
    //       articleContent={articleContent}
    //       onAddArticleTag={addSingleTag}
    //       backToSearch={backToSearch}
    //       handleOnAddTagClick={() => {
    //         this.setState({scrollY: 800});
    //         this.props.addSingleTag(articleContent.name, articleContent.id);
    //         this.props.backToSearch();
    //       }}
    //     />
    //   );
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
            updateHeaderTitles={updateHeaderTitles}
            numberOfAdultsTitle={numberOfAdultsTitle}
            numberOfChildrenTitle={numberOfChildrenTitle}
            durationTitle={durationTitle}
            setDepartureDate={setDepartureDate}
            startSearch={startSearch}
          />
          {
            this.state.screenWidth < 553 ? [
              <Header searchBar={false}/>,
              <SearchBar
                addSingleTag={addSingleTag}
                startSearch={startSearch}
                setSearchString={setSearchString}
                autocompleteOptions={autocompleteOptions}
                searchString={searchString}
                getAutocompleteOptions={getAutocompleteOptions}
                inAutoCompleteSearch={inAutoCompleteSearch}
                clearSearchString={clearSearchString}
              />
            ]
            : <Header
                addSingleTag={addSingleTag}
                startSearch={startSearch}
                setSearchString={setSearchString}
                autocompleteOptions={autocompleteOptions}
                searchString={searchString}
                getAutocompleteOptions={getAutocompleteOptions}
                inAutoCompleteSearch={inAutoCompleteSearch}
                clearSearchString={clearSearchString}
                searchBar
              />
          }
          <Tags
            tags={tags}
            removeTag={removeTag}
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
  bucketId: PropTypes.string,
  // for random initial results
  fetchQuerySearchResults: PropTypes.func,
  getArticle: PropTypes.func,
  // results
  loading: PropTypes.bool,
  error: PropTypes.string,
  displayedItems: PropTypes.array,
  onYesFilter: PropTypes.func,
  onFilterClick: PropTypes.func,
  filterVisibleState: PropTypes.object,

  // autocomplete
  autocompleteOptions: PropTypes.array,
  inAutoCompleteSearch: PropTypes.bool,
  getAutocompleteOptions: PropTypes.func,

  // search bar
  clearSearchString: PropTypes.func,
  setSearchString: PropTypes.func,
  searchString: PropTypes.string,
  startSearch: PropTypes.func,
  backToSearch: PropTypes.func,
  addSearchStringTag: PropTypes.func,

  // hotel
  hotelPage: PropTypes.bool,
  viewHotel: PropTypes.func,
  setHotelPage: PropTypes.func,
  hotelInView: PropTypes.object,

  // article
  onAddArticleTag: PropTypes.func,
  viewArticle: PropTypes.func,
  articlePage: PropTypes.bool,
  articleContent: PropTypes.object,

  // tags
  tags: PropTypes.array,
  addTag: PropTypes.func,
  addSingleTag: PropTypes.func,
  removeTag: PropTypes.func,

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
  numberOfAdultsTitle: PropTypes.string,
  numberOfChildrenTitle: PropTypes.string,
  durationTitle: PropTypes.string,
  updateHeaderTitles: PropTypes.string,
  setDepartureDate: PropTypes.func,

  // routing
  push: PropTypes.func
};

export default ISearch;

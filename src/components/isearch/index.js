import React, { PropTypes, Component } from 'react';
import Header from '../../../lib/hero-image-header/';
import SearchSummary from '../../../lib/search-summary';
import Tags from '../../../lib/tags/';
import SearchResults from '../search-results';
import LoadingSpinner from '../../../lib/spinner';
import ScrollView from '../../../lib/scroll-view';
import EditDetails from '../edit-details';
import departOnFriday from '../../utils/departure-day-format';
import departureOptions from '../../constants/departureOptions';
import moment from 'moment';
import './style.css';

class ISearch extends Component {

  constructor () {
    super();
    this.state = {
      screenWidth: window.innerWidth,
      feedItems: [],
      endScroll: false
    };
    this.handleResize = this.handleResize.bind(this);
    this.loadQueryParams = this.loadQueryParams.bind(this);
  }

  componentWillMount () {
    window.addEventListener('resize', this.handleResize);
    this.addAnalyticsData();
    this.loadQueryParams(document.location.search);
  }
  loadQueryParams (query) {
    let params = query.replace('?', '').split('&');
    if (!params.length) return;
    const {
      setNumberOfChildren,
      setNumberOfAdults,
      setDepartureAirport,
      setDuration,
      updateHeaderTitles
    } = this.props;
    let parsedQuery = {};
    params.map((param) => {
      parsedQuery[param.split('=')[0]] = param.split('=')[1] || true;
    });
    if (!isNaN(parsedQuery.travelAdults) && parsedQuery.travelAdults > 0) setNumberOfAdults(parsedQuery.travelAdults);
    if (!isNaN(parsedQuery.travelChildren) && parsedQuery.travelChildren > 0) setNumberOfChildren(parsedQuery.travelChildren);
    if (!isNaN(parsedQuery.travelDuration) && parsedQuery.travelDuration > 0) {
      // We get duration as number of days, but we are using weeks so we need to convert it.
      let durationWeeks = Math.round(parsedQuery.travelDuration / 7);
      setDuration(durationWeeks + ' uge' + (durationWeeks > 1 ? 'r' : ''));
    }
    if (parsedQuery.travelDepartureCode && departureOptions[parsedQuery.travelDepartureCode]) setDepartureAirport(departureOptions[parsedQuery.travelDepartureCode]);
    updateHeaderTitles();
  }

  handleResize () {
    this.setState({ screenWidth: window.innerWidth });
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }

  addAnalyticsData () {
    if (dataLayer) {
      dataLayer.push({
        'event': 'homepageViewed',
        'pageName': '/InspirationalSearch'
      });
    }
  }

  renderResults () {
    const {
      onYesFilter,
      onFilterClick,
      setHotelPage,
      numberOfChildrenTitle,
      numberOfAdultsTitle,
      resultId,
      push: changeRoute,
      viewedArticles,
      removeTile,
      displayedItems,
      loadMoreItemsIntoFeed,
      addArticleTag,
      searchComplete,
      feedEnd,
      showTravelInfo,
      tags,
      isInitialTag,
      ranking
    } = this.props;
    return (
      <ScrollView
        loadingThreshold={500}
        loadData={loadMoreItemsIntoFeed}
        endScroll={displayedItems.length === 0}
      >
        <SearchResults
          changeRoute={changeRoute}
          items={displayedItems}
          onYesFilter={onYesFilter}
          onFilterClick={onFilterClick}
          setHotelPage={setHotelPage}
          totalPassengers={Number(numberOfAdultsTitle) + Number(numberOfChildrenTitle)}
          resultId={resultId}
          removeTile={removeTile}
          viewedArticles={viewedArticles}
          addArticleTag={addArticleTag}
          searchComplete={searchComplete}
          feedEnd={feedEnd}
          showTravelInfo={showTravelInfo}
          tags={tags}
          isInitialTag={isInitialTag}
          ranking={ranking}
        />
      </ScrollView>
    );
  }
  render () {
    if (document.querySelector('title')) document.querySelector('title').innerHTML = 'Thomas Cook Inspirational Search';
    const {
      tags,
      removeTag,
      resetTags,
      setSearchString,
      startSearch,
      autocompleteOptions,
      searchString,
      getAutocompleteOptions,
      inAutoCompleteSearch,
      addSingleTag,
      clearSearchString,
      error,
      loading,
      numberOfChildren,
      numberOfAdults,
      childAge1,
      childAge2,
      childAge3,
      childAge4,
      departureAirport,
      duration,
      departureDate,
      danishDepartureDate,
      setNumberOfChildren,
      setNumberOfAdults,
      setChildAge,
      setDepartureAirport,
      setDuration,
      updateHeaderTitles,
      numberOfChildrenTitle,
      numberOfAdultsTitle,
      durationTitle,
      setDepartureDate,
      push: changeRoute,
      goBack,
      displayedItems,
      editDetailsVisible,
      showTravelInfo,
      hideTravelInfo
    } = this.props;
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
          changeRoute={changeRoute}
          goBack={goBack}
          editDetailsVisible={editDetailsVisible}
          showTravelInfo={showTravelInfo}
          hideTravelInfo={hideTravelInfo}
        />
        {editDetailsVisible && <EditDetails
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
          changeRoute={changeRoute}
          goBack={goBack}
          editDetailsVisible={editDetailsVisible}
          showTravelInfo={showTravelInfo}
          hideTravelInfo={hideTravelInfo}
           />}
          <Header
            addSingleTag={addSingleTag}
            startSearch={startSearch}
            setSearchString={setSearchString}
            autocompleteOptions={autocompleteOptions}
            searchString={searchString}
            getAutocompleteOptions={getAutocompleteOptions}
            inAutoCompleteSearch={inAutoCompleteSearch}
            clearSearchString={clearSearchString}
            searchBar
            displayedItems={displayedItems}
            departureDate={danishDepartureDate || departOnFriday(moment().add(3, 'months')).format('DD/MM-YYYY')}
            showTravelInfo={showTravelInfo}
            tags={tags}
            removeTag={removeTag}
            resetTags={resetTags}
            resetColour={'#F39110'}
          />
        { (window.innerWidth <= 750) && <Tags
          tags={tags}
          removeTag={removeTag}
          resetTags={resetTags}
          resetColour={'#F39110'}
          resetBorderColour={'#F39110'}
        />
        }
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

ISearch.propTypes = {
  resultId: PropTypes.string,
  // results
  loading: PropTypes.bool,
  error: PropTypes.string,
  displayedItems: PropTypes.array,
  onYesFilter: PropTypes.func,
  onFilterClick: PropTypes.func,
  ranking: PropTypes.object,

  // scroll view
  loadMoreItemsIntoFeed: PropTypes.func,
  searchComplete: PropTypes.bool,

  // autocomplete
  autocompleteOptions: PropTypes.array,
  inAutoCompleteSearch: PropTypes.bool,
  getAutocompleteOptions: PropTypes.func,

  // search bar
  clearSearchString: PropTypes.func,
  setSearchString: PropTypes.func,
  searchString: PropTypes.string,
  startSearch: PropTypes.func,
  addSearchStringTag: PropTypes.func,

  // hotel
  setHotelPage: PropTypes.func,
  hotelInView: PropTypes.object,

  // article
  onAddArticleTag: PropTypes.func,
  viewArticle: PropTypes.func,

  // tags
  tags: PropTypes.array,
  addTag: PropTypes.func,
  addSingleTag: PropTypes.func,
  addArticleTag: PropTypes.func,
  removeTag: PropTypes.func,
  resetTags: PropTypes.func,
  feedEnd: PropTypes.bool,

  // tiles
  removeTile: PropTypes.func,

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
  danishDepartureDate: PropTypes.string,
  setChildAge: PropTypes.func,
  numberOfAdultsTitle: PropTypes.string,
  numberOfChildrenTitle: PropTypes.string,
  durationTitle: PropTypes.string,
  updateHeaderTitles: PropTypes.func,
  setDepartureDate: PropTypes.func,
  editDetailsVisible: PropTypes.bool,
  showTravelInfo: PropTypes.func,
  hideTravelInfo: PropTypes.func,

  // routing
  push: PropTypes.func,

  isInitialTag: PropTypes.bool,
  viewedArticles: PropTypes.array,
  goBack: PropTypes.func
};

export default ISearch;

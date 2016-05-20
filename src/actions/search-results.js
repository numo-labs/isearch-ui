'use strict';

// constants
import { QUERY_FETCH_SEARCH_RESULT } from '../constants/queries';
import { MUTATION_START_SEARCH } from '../constants/mutations';
import {
  RECEIVE_SEARCH_RESULT,
  BUSY_SEARCHING,
  SET_SEARCH_STRING,
  SAVE_SEARCH_RESULT_ID,
  UPDATE_DISPLAYED_ITEMS,
  SEARCH_ERROR,
  VIEW_SEARCH,
  UPDATE_HEADER_TITLES,
  SAVE_BUCKET_ID
} from '../constants/actionTypes';
import { addTiles } from './tags.js';

// actions
import * as graphqlService from '../services/graphql';
import { formatQuery } from './helpers.js';
import _ from 'lodash';
import { push } from 'react-router-redux';
/**
* Gets the id of the searchBucket and initiates a graphql query to retrieve
* the search results
* @param {String} - id - searchbucketid
* @param {Number} - page - page to start from
* @param {Number} - size - number of results to retrieve
* @param {Number} - attempt - the number of times the function has been called (starts at 1)
*
* Polls graphql 10 times before returning an error
*/

export function fetchQuerySearchResults (id, page, size, attempt, addedTilesAlready = false) {
  const fetchQuerySearchResults_anonymousFn = (dispatch, getState) => {
    const { search: { displayedItems, bucketId } } = getState();
    if (bucketId === id) {
      const initialSearch = displayedItems.length === 0;
      return graphqlService
        .query(QUERY_FETCH_SEARCH_RESULT, {'id': id, 'page': page, 'size': size})
        .then(json => {
          const items = json.data.viewer.searchResult.items;
          let tilesHaveBeenAdded = addedTilesAlready;
          // Are there items already?
          if (items && items.length) {
            const arePackagesAvailable = packageOffersReturned(items);
            const areTilesAvailable = tilesReturned(items);
            let finished = false;
            if (attempt <= 5 && arePackagesAvailable && areTilesAvailable) {
              if (initialSearch) { dispatch(addTiles()); }
              dispatch(updateSearchId(id));
              dispatch(receiveSearchResult(items, initialSearch));
              finished = true;
            } else if (attempt >= 5 && !arePackagesAvailable && !tilesHaveBeenAdded) {
              if (initialSearch) { dispatch(addTiles()); }
              dispatch(updateSearchId(id));
              dispatch(receiveSearchResult(items, initialSearch));
              tilesHaveBeenAdded = true;
            } else if (attempt > 5 && arePackagesAvailable) {
              if (initialSearch) { dispatch(addTiles()); }
              dispatch(updateSearchId(id));
              dispatch(receiveSearchResult(items, initialSearch, true));
              finished = true;
            }

            if (attempt < 15 && !finished) {
              setTimeout(function () {
                console.log('Retrying', attempt);
                dispatch(fetchQuerySearchResults(id, page, size, ++attempt, tilesHaveBeenAdded));
              }, 1000);
            }
          } else if (attempt <= 15) {
            // Try again bro
            setTimeout(function () {
              console.log('Retrying', attempt);
              dispatch(fetchQuerySearchResults(id, page, size, ++attempt));
            }, 1000);
          } else {
            dispatch(searchError('No Results Found'));
          }
        });
    } else {
      console.log('Stopped searching for ' + bucketId + ' because a new search started for ' + id);
    }
  };
  return fetchQuerySearchResults_anonymousFn; // needed for testing polling
}

function packageOffersReturned (items) {
  return items.some(function (item) {
    if (item.type === 'packageOffer') return true;
  });
}

function tilesReturned (items) {
  return items.some(function (item) {
    if (item.type === 'tile') return true;
  });
}

/*
* saves the error to the store to display an error message
*/

export function searchError (error) {
  return {
    type: SEARCH_ERROR,
    error
  };
}

/*
* Receives the items and adds them to the items store as well as merging them
* with the currently displayedItems
*/
export function receiveSearchResult (items, initialSearch, append) {
  return {
    type: RECEIVE_SEARCH_RESULT,
    items,
    initialSearch,
    append: append || false
  };
}

/*
* Function that updates the bucketID if it has changed
*/
export function updateSearchId (id) {
  return (dispatch, getState) => {
    const { search: { resultId } } = getState();
    if (id !== resultId) {
      console.log('saving id');
      return dispatch(saveSearchResultId(id));
    }
  };
}

/*
* Saves the searchResultId to update links to articles in the UI
*/

export function saveSearchResultId (id) {
  return {
    type: SAVE_SEARCH_RESULT_ID,
    id: id
  };
}

/*
* Saves the input search string to state
*/

export function setSearchString (searchString) {
  return {
    type: SET_SEARCH_STRING,
    searchString
  };
}

/*
* Sets the loading state to true to show a loading spinner
*/

export function busySearching (isBusy) {
  return {
    type: BUSY_SEARCHING,
    isBusy
  };
}

/*
* Saves the searchBucketId if in future we need to retrieve more
* results on scroll
*/

export function saveBucketId (id) {
  return {
    type: SAVE_BUCKET_ID,
    id: id
  };
}

/*
* Updates the displayedItems state with the filtered results
*/

export function updateDisplayedItems (results) {
  return {
    type: UPDATE_DISPLAYED_ITEMS,
    items: results
  };
}

/**
* Action that is called when the 'yes' button on a filter is clicked
* 1. get all the geo and amenity tags
* 2. if search results already exist, filter the existing results and update
* the displayedItems
* 3. launch a new search to get more items
*/

export function filterResults () {
  return (dispatch, getState) => {
    const { search: { tags, items } } = getState();
    const geoTags = tags.filter(tag => tag.id.indexOf('geo') > -1);
    const amenityTags = tags.filter(tag => tag.id.indexOf('amenity') > -1);
    if (items.length > 0) {
      const results = items.filter(item => {
        if (item.packageOffer) {
          return (
            // geoTags.some(tag => item.packageOffer.hotel.place.country === tag.displayName) && // e.g. either spain or greece
            amenityTags.every(tag => item.packageOffer.amenities[tag.id.split(':')[1]]) // and with wifi and kids friendly
          );
        } else {
          return true;
        }
      });
      dispatch(updateDisplayedItems(results));
    }
    if (geoTags.length > 0) {
      dispatch(startSearch());
    }
  };
}

function combinePassengersForQuery (childAgeArray, numberOfChildren, numberOfAdults) {
  const slicedChildAgeArray = childAgeArray.slice(0, Number(numberOfChildren));
  const childPassengers = slicedChildAgeArray.map(slicedChildAge => {
    const date = new Date();
    const year = date.getFullYear() - Number(slicedChildAge.split(' ')[0]);
    const month = ('0' + date.getMonth()).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return (
      {
        birthday: `${year}-${month}-${day}`
      }
    );
  });
  const adultPassengers = _.times(numberOfAdults, function () {
    const date = new Date();
    const year = date.getFullYear() - 20;
    const month = ('0' + date.getMonth()).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return (
      {
        birthday: `${year}-${month}-${day}`
      }
    );
  });
  const combinedPassengers = [...childPassengers, ...adultPassengers];
  return combinedPassengers;
}

// function that builds the travel period for the query
function constructTravelPeriodQuery (departureDate, duration) {
  const nights = (Number(duration.split(' ')[0]) * 7);
  const travelPeriod = {
    departureBetween: [departureDate],
    nights: [nights]
  };
  return travelPeriod;
}

// function that builds the departure airport query
function constructDepartureAirportQuery (departureAirport) {
  const airportCode = departureAirport.split(' ')[2];
  const departureAirportMapped = `airport:master.${airportCode}`;
  const airport = [departureAirportMapped];
  return airport;
}

/**
* Action to start the search
* 1. format the query based on the tags
* 2. launch a graphql mutation to return a searchBucketId
*/

export function startSearch () {
  return (dispatch, getState) => {
    const {
       search: {
        tags
        },
       travelInfo: {
        numberOfChildren,
        numberOfAdults,
        childAge1,
        childAge2,
        childAge3,
        childAge4,
        departureDate,
        duration,
        departureAirport
      }
    } = getState();
    const childAgeArray = [childAge1, childAge2, childAge3, childAge4];
    if (tags.length > 0) {
      dispatch(busySearching(true));
      const formattedTags = formatQuery(tags);
      const passengers = combinePassengersForQuery(childAgeArray, numberOfChildren, numberOfAdults);
      const departureAirports = constructDepartureAirportQuery(departureAirport);
      const travelPeriod = constructTravelPeriodQuery(departureDate, duration);
      const query = {passengers: passengers, travelPeriod: travelPeriod, departureAirports: departureAirports, ...formattedTags};
      console.log('query', JSON.stringify(query));
      return graphqlService
        .query(MUTATION_START_SEARCH, {'query': JSON.stringify(query)})
        .then(json => {
          console.log('search response json', json);
          const bucketId = json.data.viewer.searchResultId.id;
          if (bucketId) {
            dispatch(saveBucketId(bucketId));
            dispatch(push(`/search/${bucketId}`));
            dispatch(fetchQuerySearchResults(bucketId, 0, 1000, 1));
          } else {
            return;
          }
        });
    }
  };
}
export const backToSearch = () => { return {type: VIEW_SEARCH}; };
export const updateHeaderTitles = () => {
  return (dispatch, getState) => {
    const {
      search: {
        numberOfAdults,
        numberOfChildren,
        duration
      }
    } = getState();
    dispatch(updateTitles(numberOfAdults, numberOfChildren, duration));
  };
};

export const updateTitles = (numberOfAdults, numberOfChildren, duration) => { return { type: UPDATE_HEADER_TITLES, numberOfAdults, numberOfChildren, duration }; };

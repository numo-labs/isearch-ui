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
  SET_NUMBER_OF_ADULTS_TITLE,
  SET_NUMBER_OF_CHILDREN_TITLE,
  SET_DURATION_TITLE
} from '../constants/actionTypes';

// actions
import * as graphqlService from '../services/graphql';
import { addTiles } from './tags.js';
import { formatQuery } from './helpers.js';
import _ from 'lodash';

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

export function fetchQuerySearchResults (id, page, size, attempt) {
  const fetchQuerySearchResults_anonymousFn = (dispatch, getState) => {
    const { search: { displayedItems } } = getState();
    const initialSearch = displayedItems.length === 0;
    return graphqlService
      .query(QUERY_FETCH_SEARCH_RESULT, {'id': id, 'page': page, 'size': size})
      .then(json => {
        const items = json.data.viewer.searchResult.items;
        console.log(!items || !items.length);
        if (attempt > 15) {
          return dispatch(searchError('Something went wrong and no results were found'));  // stop polling after 10 attempts
        } else if ((!items || !items.length || !packageOffersReturned(items))) {
          setTimeout(function () {
            console.log('Retrying', attempt);
            dispatch(fetchQuerySearchResults(id, page, size, ++attempt));
          }, 1000);
        } else {
          if (initialSearch) {
            dispatch(addTiles()); // add filters if it is the initial search
          }
          dispatch(receiveSearchResult(items, initialSearch));
        }
      });
  };
  return fetchQuerySearchResults_anonymousFn; // needed for testing polling
}

function packageOffersReturned (items) {
  return items.some(function (item) {
    if (item.type === 'packageOffer') return true;
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
export function receiveSearchResult (items, initialSearch) {
  return {
    type: RECEIVE_SEARCH_RESULT,
    items,
    initialSearch
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

export function busySearching () {
  return {
    type: BUSY_SEARCHING
  };
}

/*
* Saves the searchBucketId if in future we need to retrieve more
* results on scroll
*/

export function saveSearchResultId (id) {
  return {
    type: SAVE_SEARCH_RESULT_ID,
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
    const month = date.getMonth();
    const day = date.getDate();
    return (
      {
        birthday: `${year}-${month}-${day}`
      }
    );
  });
  const adultPassengers = _.times(numberOfAdults, function () {
    const date = new Date();
    const year = date.getFullYear() - 18;
    const month = date.getMonth();
    const day = date.getDate();
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

function constructDepartureAirportQuery (departureAirport) {
  const departureAirports = [departureAirport];
  return departureAirports;
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
        childAge4
      }
    } = getState();
    const childAgeArray = [childAge1, childAge2, childAge3, childAge4];
    const slicedChildAgeArray = childAgeArray.slice(0, Number(numberOfChildren));
    const childPassengers = slicedChildAgeArray.map(slicedChildAge => {
      const date = new Date();
      const year = date.getFullYear() - Number(slicedChildAge.split(' ')[0]);
      const month = date.getMonth();
      const day = date.getDate();
      return (
        {
          birthday: `${year}-${month}-${day}`
        }
      );
    });
    const adultPassengers = _.times(numberOfAdults, function () {
      const date = new Date();
      const year = date.getFullYear() - 18;
      const month = date.getMonth();
      const day = date.getDate();
      return (
        {
          birthday: `${year}-${month}-${day}`
        }
      );
    });
    const combinedPassengers = [...childPassengers, ...adultPassengers];
    dispatch(busySearching());
    const formattedTags = formatQuery(tags);
    // const combinedPassengers = combinePassengersForQuery(childAgeArray, numberOfChildren, numberOfAdults);
    // const query = {passengers: combinedPassengers, ...formattedTags};
    const query = formattedTags;
    console.log('query', JSON.stringify(query));
    return graphqlService
      .query(MUTATION_START_SEARCH, {'query': JSON.stringify(query)})
      .then(json => {
        const searchResultId = json.data.viewer.searchResultId.id;
        dispatch(saveSearchResultId(searchResultId));
        dispatch(fetchQuerySearchResults(searchResultId, 1, 100, 1));
      });
  };
}

export const backToSearch = () => { return {type: VIEW_SEARCH}; };

export const setNumberOfAdultsTitle = (numberOfAdultsTitle) => { return {type: SET_NUMBER_OF_ADULTS_TITLE, numberOfAdultsTitle}; };
export const setNumberOfChildrenTitle = (numberOfChildrenTitle) => { return {type: SET_NUMBER_OF_CHILDREN_TITLE, numberOfChildrenTitle}; };
export const setDurationTitle = (durationTitle) => { return {type: SET_DURATION_TITLE, durationTitle}; };

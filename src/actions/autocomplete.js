'use strict';
import * as graphqlService from '../services/graphql';
import {
  SET_AUTOCOMPLETE_OPTIONS,
  SET_AUTOCOMPLETE_ERROR,
  SET_AUTOCOMPLETE_IN_SEARCH
} from '../constants/actionTypes.js';

import { QUERY_AUTOCOMPLETE_INPUT } from '../constants/queries.js';

/**
* Function to fetch the autocomplete options from the graphql suggestion
* service
* Uses the searchString from the redux store
*/

export function getAutocompleteOptions () {
  return (dispatch, getState) => {
    const { search: { searchString } } = getState();
    if (searchString.length > 0) {
      dispatch(setAutocompleteInSearch());
      const variables = {
        input: searchString,
        size: 100
      };
      graphqlService
        .query(QUERY_AUTOCOMPLETE_INPUT, variables)
        .then(json => {
          console.log('Autocomplete response', json);
          const { data: { viewer: { autocomplete } } } = json;
          if (autocomplete && autocomplete.items) {
            return dispatch(setAutocompleteOptions(autocomplete.items));
          } else {
            return dispatch(setAutocompleteError('No matches found'));
          }
        });
    }
  };
}

export function setAutocompleteOptions (items) {
  return { type: SET_AUTOCOMPLETE_OPTIONS, items };
}

export function setAutocompleteError (error) {
  return { type: SET_AUTOCOMPLETE_ERROR, error };
}

export function setAutocompleteInSearch () {
  return { type: SET_AUTOCOMPLETE_IN_SEARCH };
}

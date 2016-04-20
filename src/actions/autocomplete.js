'use strict';
import * as graphqlService from '../services/graphql';
import {
  SET_AUTOCOMPLETE_OPTIONS,
  SET_AUTOCOMPLETE_ERROR,
  SET_AUTOCOMPLETE_IN_SEARCH
} from '../constants/actionTypes.js';

import { QUERY_AUTOCOMPLETE_INPUT } from '../constants/queries.js';

export function getAutocompleteOptions (searchString) {
  return (dispatch, getState) => {
    const { search: { searchString } } = getState();
    if (searchString.length >= 3) {
      dispatch(setAutocompleteInSearch());
      graphqlService.query(QUERY_AUTOCOMPLETE_INPUT, {input: searchString, suggester: 'DISPLAYNAME', size: 250})
      .then(json => {
        console.log('autocomplete', json);
        if (json.data.viewer.autocomplete.items) {
          var items = json.data.viewer.autocomplete.items.map(function (item) {
            return {
              id: item.id,
              suggestion: item.suggestion
            };
          });
          return dispatch(setAutocompleteOptions(items));
        } else {
          return dispatch(autocompleteError('No matches found'));
        }
      });
    }
  };
}

export function setAutocompleteOptions (items) {
  return { type: SET_AUTOCOMPLETE_OPTIONS, items };
}

export function autocompleteError (error) {
  return { type: SET_AUTOCOMPLETE_ERROR, error };
}

export function setAutocompleteInSearch () {
  return { type: SET_AUTOCOMPLETE_IN_SEARCH };
}

import {
  RECEIVE_SEARCH_RESULT,
  BUSY_SEARCHING,
  // TAG_ADD_TAGS,
  TAG_REMOVE_TAG,
  UPDATE_DISPLAYED_ITEMS,
  SEARCH_ERROR,
  TAG_ADD_SINGLE_TAG,
  FILTER_ON_CLICK,
  SET_SEARCH_STRING,
  TILES_ADD_TILES,
  SET_AUTOCOMPLETE_ERROR,
  SET_AUTOCOMPLETE_OPTIONS,
  SET_AUTOCOMPLETE_IN_SEARCH
} from '../../src/constants/actionTypes';

import { expect } from 'chai';
import reducer, { initialState } from '../../src/reducers/search';
import mockResults from '../../src/utils/mock-search-results.json';
import { mockTiles } from '../../src/reducers/utils/mockData.js';
import { shuffleMockedTilesIntoResultSet } from '../../src/reducers/utils/helpers.js';

const mockItems = mockResults.items;

const initialStateWithTiles = {
  ...initialState,
  tiles: mockTiles
};

describe('Search Reducer', () => {
  it('should return the initial state', (done) => {
    const state = reducer(undefined, {});
    expect(state).to.deep.equal(initialState);
    done();
  });
  describe('Search actions', () => {
    it(`RECEIVE_SEARCH_RESULT:initialSearch = false -> adds items to the items
        and displayedItems state`, (done) => {
      const action = {type: RECEIVE_SEARCH_RESULT, items: mockItems};
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        items: mockItems,
        displayedItems: mockItems,
        loading: false
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it(`RECEIVE_SEARCH_RESULT:initialSearch = true -> adds action.items to items
        and both items and tiles to the displayed items`, (done) => {
      const action = {
        type: RECEIVE_SEARCH_RESULT,
        items: mockItems,
        initialSearch: true
      };
      const state = reducer(initialStateWithTiles, action);
      const shuffledItems = shuffleMockedTilesIntoResultSet(mockItems, mockTiles);
      const expectedState = {
        ...initialStateWithTiles,
        items: mockItems,
        displayedItems: shuffledItems,
        loading: false
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it(`RECEIVE_SEARCH_RESULT:initialSearch = false -> adds action.items to items
        and displayedItems and removes duplicates`, (done) => {
      const shuffledItems = shuffleMockedTilesIntoResultSet(mockItems, mockTiles);
      const initialStateWithItems = {
        ...initialStateWithTiles,
        items: mockItems,
        displayedItems: shuffledItems
      };
      const action = {
        type: RECEIVE_SEARCH_RESULT,
        items: mockItems,
        initialSearch: true
      };
      const state = reducer(initialStateWithItems, action);
      const expectedState = {
        ...initialStateWithTiles,
        items: mockItems,
        displayedItems: shuffledItems,
        loading: false
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it(`UPDATE_DISPLAYED_ITEMS -> adds action.items and state.tiles to
        displayedItems`, (done) => {
      const shuffledItems = shuffleMockedTilesIntoResultSet(mockItems, mockTiles);
      const action = {
        type: UPDATE_DISPLAYED_ITEMS,
        items: mockItems,
        initialSearch: true
      };
      const state = reducer(initialStateWithTiles, action);
      const expectedState = {
        ...initialStateWithTiles,
        displayedItems: shuffledItems
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it('BUSY_SEARCHING -> sets loading to true', (done) => {
      const action = {type: BUSY_SEARCHING};
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        loading: true
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it(`SEARCH_ERROR: sets loading to false and sets the error state to
        action.error`, (done) => {
      const action = {type: SEARCH_ERROR, error: 'error'};
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        loading: false,
        error: 'error'
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it('SET_SEARCH_STRING -> updates the searchString in the state', (done) => {
      const action = {type: SET_SEARCH_STRING, searchString: 'hello'};
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        searchString: 'hello'
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
  });
  describe('Tag and Tile actions', () => {
    it(`TAG_ADD_SINGLE_TAG -> adds action.tag to the state if it doesnt already
        exist`, (done) => {
      const initialStateWithTags = {
        ...initialState,
        tags: [{ displayName: 'hello' }]
      };
      const action = {type: TAG_ADD_SINGLE_TAG, tag: {displayName: 'world'}};
      const state = reducer(initialStateWithTags, action);
      const expectedState = {
        ...initialState,
        tags: [{ displayName: 'hello' }, {displayName: 'world'}]
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it('TAG_ADD_SINGLE_TAG -> doesnt add the tag if it already exists', (done) => {
      const initialStateWithTags = {
        ...initialState,
        tags: [{ displayName: 'hello' }]
      };
      const action = {type: TAG_ADD_SINGLE_TAG, tag: {displayName: 'hello'}};
      const state = reducer(initialStateWithTags, action);
      const expectedState = {
        ...initialState,
        tags: [{ displayName: 'hello' }]
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it('TAG_REMOVE_TAG -> removes action.tag from the tags array', (done) => {
      const initialStateWithTags = {
        ...initialState,
        tags: [{ displayName: 'hello' }]
      };
      const action = {type: TAG_REMOVE_TAG, displayName: 'hello'};
      const state = reducer(initialStateWithTags, action);
      const expectedState = {
        ...initialState,
        tags: []
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it(`FILTER_ON_CLICK -> updates the filter visible state and removes the tile
        from the tiles array`, (done) => {
      const action = {type: FILTER_ON_CLICK, displayName: 'Wifi'};
      const initialStateWithFilters = {
        ...initialStateWithTiles,
        filterVisibleState: {
          'Wifi': true
        }
      };
      const state = reducer(initialStateWithFilters, action);
      const expectedState = {
        ...initialState,
        filterVisibleState: {
          'Wifi': false
        },
        tiles: mockTiles.filter(tile => tile.displayName !== 'Wifi')
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it(`TILES_ADD_TILES -> adds the tiles to the state and sets the
        filterVisibleState`, (done) => {
      const action = {type: TILES_ADD_TILES};
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        tiles: mockTiles,
        filterVisibleState: {
          'Wifi': true,
          'Kids': true,
          'All inclusive': true
        }
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
  })
  describe('Autocomplete actions', () => {
    it(`SET_AUTOCOMPLETE_OPTIONS -> updates the autocompleteOptions state with
        the items and sets inAutocompleteSearch to false`, (done) => {
      const action = { type: SET_AUTOCOMPLETE_OPTIONS, items: [{}] };
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        autocompleteOptions: [{}],
        inAutoCompleteSearch: false
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it(`SET_AUTOCOMPLETE_ERROR -> updates the autocompleteError state with
        the error`, (done) => {
      const action = { type: SET_AUTOCOMPLETE_ERROR, error: 'error' };
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        autocompleteError: 'error',
        inAutoCompleteSearch: false
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it(`SET_AUTOCOMPLETE_IN_SEARCH -> sets the inAutoCompleteSearch state to
        true`, (done) => {
      const action = { type: SET_AUTOCOMPLETE_IN_SEARCH };
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        inAutoCompleteSearch: true
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
  });
});

import {
  RECEIVE_SEARCH_RESULT,
  BUSY_SEARCHING,
  // TAG_ADD_TAGS,
  TAG_REMOVE_TAG,
  RESET_TAGS,
  SEARCH_ERROR,
  TAG_ADD_SINGLE_TAG,
  FILTER_ON_CLICK,
  SET_SEARCH_STRING,
  TILES_ADD_TILES,
  SET_AUTOCOMPLETE_ERROR,
  SET_AUTOCOMPLETE_OPTIONS,
  SET_AUTOCOMPLETE_IN_SEARCH,
  CLEAR_SEARCH_STRING,
  UPDATE_HEADER_TITLES,
  SAVE_SOCKET_CONNECTION_ID,
  SET_FINGERPRINT,
  SAVE_SEARCH_RESULT_ID,
  SAVE_BUCKET_ID
} from '../../src/constants/actionTypes';

import { expect } from 'chai';
import reducer, { initialState } from '../../src/reducers/search';
import mockResults from '../../src/utils/mock-search-results.json';
import { mockTiles } from '../../src/reducers/utils/mockData.js';
// import { shuffleTilesIntoResults } from '../../src/reducers/utils/helpers.js';

const mockItems = [mockResults.items[0]]; // an array with one packageOffer

const initialStateWithTiles = {
  ...initialState,
  tiles: mockTiles
};

describe.only('Search Reducer', () => {
  it('should return the initial state', (done) => {
    const state = reducer(undefined, {});
    expect(state).to.deep.equal(initialState);
    done();
  });
  it('SET_FINGERPRINT: should save the fingerprint', done => {
    const action = {type: SET_FINGERPRINT, fingerprint: '123456789012345'};
    const state = reducer(undefined, action);
    const expectedState = {
      ...initialState,
      fingerprint: action.fingerprint
    };
    expect(state).to.deep.equal(expectedState);
    done();
  });
  describe('Search actions', () => {
    it(`RECEIVE_SEARCH_RESULT:initialSearch = false -> adds items to the items
        and displayedItems state`, (done) => {
      const action = {type: RECEIVE_SEARCH_RESULT, items: mockItems};
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        items: mockItems.concat(mockTiles),
        loading: false
      };
      console.log('state', state);
      expect(state).to.deep.equal(expectedState);
      done();
    });
    // it(`RECEIVE_SEARCH_RESULT:initialSearch = true -> adds action.items to items
    //     and both items and tiles to the displayed items`, (done) => {
    //   const action = {
    //     type: RECEIVE_SEARCH_RESULT,
    //     items: mockItems,
    //     initialSearch: true
    //   };
    //   const state = reducer(initialStateWithTiles, action);
    //   const shuffledItems = shuffleTilesIntoResults(mockItems, mockTiles);
    //   // const expectedState = {
    //   //   ...initialStateWithTiles,
    //   //   items: mockItems,
    //   //   displayedItems: shuffledItems,
    //   //   loading: false
    //   // };
    //   expect(state.items).to.deep.equal(mockItems);
    //   expect(state.loading).to.be.false;
    //   shuffledItems.forEach(item => expect(state.displayedItems).to.include(shuffledItems[0]));
    //   done();
    // });
    // it(`RECEIVE_SEARCH_RESULT:initialSearch = false -> adds action.items to items
    //     and displayedItems and removes duplicates`, (done) => {
    //   const shuffledItems = shuffleTilesIntoResults(mockItems, mockTiles);
    //   const initialStateWithItems = {
    //     ...initialStateWithTiles,
    //     items: mockItems,
    //     displayedItems: shuffledItems
    //   };
    //   const action = {
    //     type: RECEIVE_SEARCH_RESULT,
    //     items: mockItems,
    //     initialSearch: true
    //   };
    //   const state = reducer(initialStateWithItems, action);
    //   expect(state.loading).to.be.false;
    //   expect(state.items).to.deep.equal(mockItems);
    //   shuffledItems.forEach(item => expect(state.displayedItems).to.include(shuffledItems[0]));
    //   done();
    // });
    it('BUSY_SEARCHING -> sets loading to true', (done) => {
      const action = {type: BUSY_SEARCHING, isBusy: true};
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
    it('CLEAR_SEARCH_STRING -> sets the searchString to empty in the state', (done) => {
      const action = {type: CLEAR_SEARCH_STRING};
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        searchString: ''
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it('SAVE_SEARCH_RESULT_ID -> saves the search result id', (done) => {
      const action = {type: SAVE_SEARCH_RESULT_ID, id: '12345'};
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        resultId: '12345'
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it('SAVE_BUCKET_ID -> saves the buckeId', (done) => {
      const action = {type: SAVE_BUCKET_ID, id: '12345'};
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        bucketId: '12345'
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
      const action = {type: TAG_ADD_SINGLE_TAG, tag: {displayName: 'world'}, isInitialTag: false};
      const state = reducer(initialStateWithTags, action);
      const expectedState = {
        ...initialState,
        tags: [{ displayName: 'hello' }, {displayName: 'world'}],
        isInitialTag: false
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it('TAG_ADD_SINGLE_TAG -> doesnt add the tag if it already exists', (done) => {
      const initialStateWithTags = {
        ...initialState,
        tags: [{ displayName: 'hello' }]
      };
      const action = {type: TAG_ADD_SINGLE_TAG, tag: {displayName: 'hello'}, isInitialTag: false};
      const state = reducer(initialStateWithTags, action);
      const expectedState = {
        ...initialState,
        tags: [{ displayName: 'hello' }],
        isInitialTag: false
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
    it('RESET_TAGS -> sets tags array to action.tags', (done) => {
      const initialStateWithTags = {
        ...initialState,
        tags: [{ displayName: 'hello' }],
        isInitialTag: false
      };
      const action = {type: RESET_TAGS, tags: [{displayName: 'test', id: 'id'}]};
      const state = reducer(initialStateWithTags, action);
      const expectedState = {
        ...initialState,
        tags: [{displayName: 'test', id: 'id'}],
        isInitialTag: true
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
  });
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
  describe('Header Title update action', () => {
    it(`UPDATE_HEADER_TITLES -> updates the adult, child and duration title
        states`, (done) => {
      const action = { type: UPDATE_HEADER_TITLES };
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        numberOfAdultsTitle: 2,
        numberOfChildrenTitle: 0,
        durationTitle: '1 uge',
        numberOfAdults: 2,
        numberOfChildren: 0,
        duration: '1 uge'
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
  });
  describe('Web socket connection id save action', () => {
    it(`SAVE_SOCKET_CONNECTION_ID -> saves action.id as socketConnectionId`, (done) => {
      const action = { type: SAVE_SOCKET_CONNECTION_ID, id: '12345' };
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        socketConnectionId: '12345'
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
  });
});

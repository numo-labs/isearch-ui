import {
  UPDATE_HEADER_TITLES
} from '../../src/constants/actionTypes';

import { expect } from 'chai';
import reducer, { initialState } from '../../src/reducers/travel-info';

describe('TravelInfo reducer', function () {
  describe('Header Title update action', () => {
    it(`UPDATE_HEADER_TITLES -> updates the adult, child and duration title
        states`, (done) => {
      const action = { type: UPDATE_HEADER_TITLES };
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        numberOfAdultsTitle: '1',
        numberOfChildrenTitle: '0',
        durationTitle: '1 uge',
        numberOfAdults: '1',
        numberOfChildren: '0',
        duration: '1 uge'
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
  });
});

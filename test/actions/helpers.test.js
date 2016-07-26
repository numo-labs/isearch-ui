'use strict';

import { formatTags, combinePassengersForQuery } from '../../src/actions/helpers.js';
import { expect } from 'chai';

describe('Helpers', () => {
  const tags = [
    {id: 'geo:geonames:12345', displayName: 'spain'},
    {id: 'amenity:wifi', displayName: 'wifi'},
    {id: 'amenity:pool', displayName: 'pool'}
  ];
  describe('formatQuery', () => {
    it('returns an object with geography and amenity keys', (done) => {
      const res = formatTags(tags);
      expect(Object.keys(res)).to.deep.equal(['geography', 'amenity']);
      expect(res.geography).to.deep.equal(['geo:geonames:12345']);
      expect(res.amenity).to.deep.equal(['amenity:wifi', 'amenity:pool']);
      done();
    });
    it('returns an object with geography key if there are no amenity tags', (done) => {
      const tags = [
        {id: 'geo:geonames:12345', displayName: 'spain'}
      ];
      const res = formatTags(tags);
      expect(Object.keys(res)).to.deep.equal(['geography']);
      expect(res.geography).to.deep.equal(['geo:geonames:12345']);
      done();
    });
  });
  describe('combinePassengersForQuery', () => {
    var timers;
    before(() => {
      timers = sinon.useFakeTimers((new Date('2016-05-31')).getTime());
    });
    after(() => {
      timers.restore();
    });
    it('sets birthday properties of children according to their age', () => {
      const result = combinePassengersForQuery(['10', '12'], 2, 2);
      expect(result[0].birthday).to.eql('2006-05-31');
      expect(result[1].birthday).to.eql('2004-05-31');
    });
    it('sets birthday properties of adults to "today - 20 years"', () => {
      const result = combinePassengersForQuery(['10', '12'], 2, 2);
      expect(result[2].birthday).to.eql('1996-05-31');
      expect(result[3].birthday).to.eql('1996-05-31');
    });
  });
});

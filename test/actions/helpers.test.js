'use strict';

import { filterMap, formatQuery } from '../../src/actions/helpers.js';
import { expect } from 'chai';

describe('Filter helpers', () => {
  const tags = [
    {id: 'geo:geonames:12345', displayName: 'spain'},
    {id: 'amenity:wifi', displayName: 'wifi'},
    {id: 'amenity:pool', displayName: 'pool'}
  ];
  it('filterMap: takes an array, filter string and key and returns the filtered mapped array', (done) => {
    const res = filterMap(tags, 'geo');
    const res2 = filterMap(tags, 'amenity');
    expect(res).to.deep.equal(['geo:geonames:12345']);
    expect(res2).to.deep.equal(['amenity:wifi', 'amenity:pool']);
    done();
  });
  it('formatQuery: returns an object with passenger, geography and amenity keys', (done) => {
    const res = formatQuery(tags);
    expect(Object.keys(res)).to.deep.equal(['passengers', 'geography', 'amenity']);
    expect(res.geography).to.deep.equal(['geo:geonames:12345']);
    expect(res.amenity).to.deep.equal(['amenity:wifi', 'amenity:pool']);
    done();
  });
  it('formatQuery: returns an object with passenger key and only geography key if there are no amenity tags', (done) => {
    const tags = [
      {id: 'geo:geonames:12345', displayName: 'spain'}
    ];
    const res = formatQuery(tags);
    expect(Object.keys(res)).to.deep.equal(['passengers', 'geography']);
    expect(res.geography).to.deep.equal(['geo:geonames:12345']);
    done();
  });
});

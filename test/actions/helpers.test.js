'use strict';

import { formatQuery } from '../../src/actions/helpers.js';
import { expect } from 'chai';

describe('Helpers', () => {
  const tags = [
    {id: 'geo:geonames:12345', displayName: 'spain'},
    {id: 'amenity:wifi', displayName: 'wifi'},
    {id: 'amenity:pool', displayName: 'pool'}
  ];
  it('formatQuery: returns an object with geography and amenity keys', (done) => {
    const res = formatQuery(tags);
    expect(Object.keys(res)).to.deep.equal(['geography', 'amenity']);
    expect(res.geography).to.deep.equal(['geo:geonames:12345']);
    expect(res.amenity).to.deep.equal(['amenity:wifi', 'amenity:pool']);
    done();
  });
  it('formatQuery: returns an object with geography key if there are no amenity tags', (done) => {
    const tags = [
      {id: 'geo:geonames:12345', displayName: 'spain'}
    ];
    const res = formatQuery(tags);
    expect(Object.keys(res)).to.deep.equal(['geography']);
    expect(res.geography).to.deep.equal(['geo:geonames:12345']);
    done();
  });
});

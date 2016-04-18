'use strict';

export function filterMap (array, filterString, mapKey) {
  return array
    .filter(tag => tag.id.indexOf(filterString) > -1)
    .map(tag => tag[mapKey]);
}

export function formatQuery (tags) {
  const geoTags = filterMap(tags, 'geo', 'displayName');
  const amenityTags = filterMap(tags, 'amenity', 'id');
  return {
    geography: geoTags,
    amenity: amenityTags,
    passengers: [{birthday: '1986-07-14'}]
  };
}

'use strict';

export function filterMap (array, filterString) {
  return array
    .filter(tag => tag.id.indexOf(filterString) > -1)
    .map(tag => tag.id);
}

export function formatQuery (tags) {
  const geoTags = filterMap(tags, 'geo');
  const amenityTags = filterMap(tags, 'amenity');
  return {
    geography: geoTags,
    amenity: amenityTags,
    passengers: [{birthday: '1986-07-14'}]
  };
}

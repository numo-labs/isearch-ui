/*eslint-disable no-extend-native */
// linting throws error: Array prototype is read only, properties should not be added.
Array.prototype.insert = function (index, element) {
  var copy = [...this];
  Array.prototype.splice.apply(copy, [index, 0, element]);
  return copy;
};
/* eslint-enable no-extend-native */

import _ from 'lodash';

export function shuffleMockedTilesIntoResultSet (items, tiles) {
  // if there are more tiles than packages, shuffle packages into tiles and vice versa
  var base = items.length > tiles.length ? items : tiles;
  var itemsToInsert = items.length > tiles.length ? tiles : items;
  var spacing = Math.floor((base.length + itemsToInsert.length) / itemsToInsert.length);
  return itemsToInsert.reduce((result, item, index) => {
    var position = (index + 1) * spacing;
    return result.insert(position, item);
  }, base);
}

export function getTiles (arr) {
  return arr.filter(item => item.type === 'tile');
}

export function getPackages (arr) {
  return arr.filter(item => item.type === 'packageOffer');
}

export function getUniquePackages (currentItems, newItems) {
  return _.uniqBy(_.union(newItems, currentItems), (a) => a.packageOffer.provider.reference);
}

export function getUniqueTiles (currentItems, newItems) {
  return _.uniqBy(_.union(newItems, currentItems), (a) => a.tile.id);
}

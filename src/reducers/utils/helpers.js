/*eslint-disable no-extend-native */
// linting throws error: Array prototype is read only, properties should not be added.
Array.prototype.insert = function (index, element) {
  var copy = [...this];
  Array.prototype.splice.apply(copy, [index, 0, element]);
  return copy;
};
/* eslint-enable no-extend-native */

export function shuffleMockedTilesIntoResultSet (items, tiles) {
  // if there are more tiles than packages, shuffle packages into tiles and vice versa
  var base = items.length > tiles.length ? items : tiles;
  var itemsToInsert = items.length > tiles.length ? tiles : items;
  var spacing = Math.floor((base.length + itemsToInsert.length) / itemsToInsert.length);
  console.log('items', items.length, 'tiles', tiles.length, 'spacing', spacing);
  return itemsToInsert.reduce((result, item, index) => {
    var position = (index + 1) * spacing;
    console.log('index of item', index, 'position of item', position);
    return result.insert(position, item);
  }, base);
}

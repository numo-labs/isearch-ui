/*eslint-disable no-extend-native */
// linting throws error: Array prototype is read only, properties should not be added.
Array.prototype.insert = function (index, element) {
  var copy = [...this];
  Array.prototype.splice.apply(copy, [index, 0, element]);
  return copy;
};
/* eslint-enable no-extend-native */

export function shuffleMockedTilesIntoResultSet (items, tiles) {
  var spacing = Math.floor((items.length + tiles.length) / tiles.length);
  return tiles.reduce((result, tile, index) => {
    var position = (index + 1) * spacing;
    return result.insert(position, tile);
  }, items);
}

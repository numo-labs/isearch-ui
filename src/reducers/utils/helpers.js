Array.prototype.insert = function (index, element) {
  var copy = [...this];
  Array.prototype.splice.apply(copy, [index, 0, element]);
  return copy;
};

export function shuffleMockedTilesIntoResultSet (items, tiles) {
  var spacing = Math.floor((items.length + tiles.length) / tiles.length);
  return tiles.reduce((result, tile, index) => {
    var position = index * spacing;
    return result.insert(position, tile);
  }, items);
}

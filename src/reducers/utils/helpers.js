export function shuffleMockedTilesIntoResultSet (items, tiles) {
  if (items.length) {
    return addTilesToSearchResult(items, 2, Math.floor((items.length + 6) / 6), 0, tiles);
  } else {
    return items;
  }
}

function addTilesToSearchResult (items, position, index, count, tiles) {
  items.splice(position, 0, tiles[count]);
  if (count === 5) {
    return items;
  } else {
    return addTilesToSearchResult(items, position + index, index, ++count, tiles);
  }
}

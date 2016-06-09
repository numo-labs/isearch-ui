/**
 *
 * @type {{package: (function(): {id: string, brand: string, list: string}), filter: (function(): {id: number, brand:
 *   string, list: string}), tile: (function(): {id: *, category: string, brand: string, list: string})}}
 * @private
 */
const impressionObject = {
  package: (item) => {
    return {
      'id': item.packageOffer.provider.reference,
      'brand': 'hotel_tile',
      'list': 'inspirational search feed'
    };
  },
  filter: (item) => {
    return {
      'id': item.id,
      'brand': 'filter_tile',
      'list': 'inspirational search feed'
    };
  },
  tile: (item) => {
    return {
      'id': item.tile.name,
      'category': 'article category', // can this be fetched?
      'brand': 'article_tile', // hardcoded
      'list': 'inspirational search feed'
    };
  }
};

/**
 * Given an item, returns a data object ready to be pushed to
 * @param item
 * @returns {{ecommerce: {impressions: Array}, event: string}}
 */
export const impresionDataFactory = (item) => {
  var analyticsImpression = {
    'event': 'impressionsPushed',
    'ecommerce': {
      'impressions': [ impressionObject[ item.type ](item) ]
    }
  };
  return analyticsImpression;
};

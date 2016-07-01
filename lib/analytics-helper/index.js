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
      'list': 'inspirational search feed',
      'dimension11': item.packageOffer.destinationCode,
      'dimension12': item.packageOffer.destinationName,
      'dimension13': item.packageOffer.departureCode
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
    return item.tile.type === 'article' ? {
      'id': item.tile.name,
      'category': 'article category', // can this be fetched?
      'brand': 'article_tile', // hardcoded
      'list': 'inspirational search feed'
    } : {
      'id': item.tile.name,
      'brand': 'destination_tile', // hardcoded
      'list': 'inspirational search feed'
    };
  }
};

/**
 * Given an item, returns a data object ready to be pushed to dataLayer
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

/**
 * Maps item structure to retrieve the proper analytics id
 * @type {{package: (function(): string), filter: (function(): string), tile: (function(): (string))}}
 * @private
 */
const _itemIdMapping = {
  package: (item) => item.packageOffer.provider.reference,
  filter: (item) => item.id,
  tile: (item) => item.tile.name
};

/**
 * Get the item analytics ID given a search result item
 * @param item
 * @private
 */
const _getItemId = (item) => _itemIdMapping[item.type](item);

/**
 * Adds analytics data regarding impressions only if there no a previous impression within the last 30 seconds
 * @param item
 * @param dataLayer
 * @param impressionsTimestamp      Map for tracking last time a search result tile has been viewed by a user.
 *                          The key is the item ID and the value the timestamp when the last impression was tracked
 */
export const addAnalyticsImpression = (item, dataLayer, impressionsTimestamp) => {
  const itemId = _getItemId(item);
  const currentTimestamp = (new Date()).getTime();
  // If the element doesn't exists in impressionsTimestamp it means it has been never displayed to the user. So analytics event
  // will be generated.
  // if the last impression was 30 seconds ago or before a new impression analytics event will be launched.
  if (!impressionsTimestamp[itemId] || currentTimestamp - impressionsTimestamp[itemId] > 30000) {
    impressionsTimestamp[itemId] = currentTimestamp;
    dataLayer.push(impresionDataFactory(item));
  }
};

/**
 * Creates the analytics object for adding a tag
 * @param displayName
 * @param currentTags
 * @param context
 * @returns {{event: string, preference_input: *, added_tags: *, displayed_tags: string}}
 */
export const analyticsAddTagObject = (displayName, currentTags, context) => {
  const initialTagIndex = currentTags.indexOf('Top inspiration');
  if (initialTagIndex > -1) currentTags.splice(initialTagIndex, 1);
  currentTags.push(displayName);
  return {
    event: 'search_preference_input',
    preference_input: displayName,
    added_tags: displayName,
    displayed_tags: currentTags.join(',').replace(/ /g, '-'),
    context: context
  };
};

/**
 * Creates the analytics object for removing a tag
 * @param displayName
 * @param currentTags
 * @returns {{event: string, dismissed_tag: string, displayed_tags: string}}
 */
export const analyticsRemoveTagObject = (displayName, currentTags) => {
  return {
    event: 'tag_dismissed',
    dismissed_tag: displayName,
    displayed_tags: currentTags.join(',').replace(/ /g, '-')
  };
};

/**
 * Creates a analytics object for visiting a spies.dk hotel page
 * @param packageOffer
 * @returns {{event: string, ecommerce: {add: {actionField: {list: string}, products: *[]}}}}
 */
export const analyticsAddToCart = (packageOffer) => {
  return {
    event: 'addToCart',
    ecommerce: {
      add: {
        actionField: { list: 'inspirational search feed' },
        products: [{
          id: packageOffer.provider.reference,
          brand: 'hotel_tile',
          dimension11: packageOffer.destinationCode,
          dimension12: packageOffer.destinationName,
          dimension13: packageOffer.departureCode
        }]
      }
    }
  };
};

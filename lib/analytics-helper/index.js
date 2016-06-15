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
 * Creates the analytics object for adding a tag
 * @param displayName
 * @param currentTags
 * @returns {{event: string, preference_input: *, added_tags: *, displayed_tags: string}}
 */
export const analyticsAddTagObject = (displayName, currentTags) => {
  currentTags.push(displayName);
  return {
    event: 'search_preference_input',
    preference_input: displayName,
    added_tags: displayName,
    displayed_tags: currentTags.join(',').replace(/ /g, '-')
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

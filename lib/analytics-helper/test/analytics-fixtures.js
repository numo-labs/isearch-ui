'use strict';

export default {
  article: {
    item: {
      id: 'whatever',
      type: 'tile',
      tile: {
        name: 'articleName',
        type: 'article'
      }
    },
    expectedResult: {
      'event': 'impressionsPushed',
      'ecommerce': {
        'impressions': [{
          'id': 'articleName',
          'category': 'article category',
          'brand': 'article_tile',
          'list': 'inspirational search feed'
        }]
      }
    }
  },
  package: {
    item: {
      type: 'package',
      packageOffer: {
        provider: {
          reference: 'fixtureReference'
        }
      }
    },
    expectedResult: {
      'event': 'impressionsPushed',
      'ecommerce': {
        'impressions': [{
          'id': 'fixtureReference',
          'brand': 'hotel_tile',
          'list': 'inspirational search feed'
        }]
      }
    }
  },
  filter: {
    item: {
      type: 'filter',
      id: 'filterID'
    },
    expectedResult: {
      'event': 'impressionsPushed',
      'ecommerce': {
        'impressions': [{
          'id': 'filterID',
          'brand': 'filter_tile',
          'list': 'inspirational search feed'
        }]
      }
    }
  },
  destination: {
    item: {
      id: 'whatever',
      type: 'tile',
      tile: {
        name: 'destinationName',
        type: 'destination'
      }
    },
    expectedResult: {
      'event': 'impressionsPushed',
      'ecommerce': {
        'impressions': [{
          'id': 'destinationName',
          'brand': 'destination_tile',
          'list': 'inspirational search feed'
        }]
      }
    }
  }
};

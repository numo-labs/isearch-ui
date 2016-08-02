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
      'tiles_displayed': 'search or filter results',
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
        },
        destinationCode: 'destCode',
        destinationName: 'destName',
        departureCode: 'depCode'
      }
    },
    expectedResult: {
      'event': 'impressionsPushed',
      'tiles_displayed': 'search or filter results',
      'ecommerce': {
        'impressions': [{
          'id': 'fixtureReference',
          'brand': 'hotel_tile',
          'list': 'inspirational search feed',
          'dimension11': 'destCode',
          'dimension12': 'destName',
          'dimension13': 'depCode'
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
      'tiles_displayed': 'search or filter results',
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
      'tiles_displayed': 'search or filter results',
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

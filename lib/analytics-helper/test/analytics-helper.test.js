'use strict';

import * as analyticsHelper from '../index';
import fixtures from './analytics-fixtures';
import { expect } from 'chai';

describe('Analytics helper', function () {
  describe('Impressions data factory', function () {
    it('Should create a proper impression element given an article item ', function (done) {
      let articleItem = fixtures.article.item;
      let analyticsObject = analyticsHelper.impresionDataFactory(articleItem);
      let expectedObject = fixtures.article.expectedResult;
      expect(analyticsObject).to.deep.equal(expectedObject);
      done();
    });
    it('Should create a proper impression element given a package item ', function (done) {
      let packageItem = fixtures.package.item;
      let analyticsObject = analyticsHelper.impresionDataFactory(packageItem);
      let expectedObject = fixtures.package.expectedResult;
      expect(analyticsObject).to.deep.equal(expectedObject);
      done();
    });
    it('Should create a proper impression element given a filter item ', function (done) {
      let filterItem = fixtures.filter.item;
      let analyticsObject = analyticsHelper.impresionDataFactory(filterItem);
      let expectedObject = fixtures.filter.expectedResult;
      expect(analyticsObject).to.deep.equal(expectedObject);
      done();
    });
    it('Should create a proper impression element given a destination item ', function (done) {
      let destinationItem = fixtures.destination.item;
      let analyticsObject = analyticsHelper.impresionDataFactory(destinationItem);
      let expectedObject = fixtures.destination.expectedResult;
      expect(analyticsObject).to.deep.equal(expectedObject);
      done();
    });
  });
  describe('Add tag analytics object', function () {
    it('Should return a object with no displayed_tags if there is no current tags', function (done) {
      const tagToAdd = 'tag to be added';
      const currentTags = [];
      const analyticsObject = analyticsHelper.analyticsAddTagObject(tagToAdd, currentTags, 'search');
      const expectedObject = {
        'event': 'search_preference_input',
        'preference_input': 'tag to be added',
        'added_tags': 'tag to be added',
        'displayed_tags': 'tag-to-be-added',
        'context': 'search'
      };
      expect(analyticsObject).to.deep.equal(expectedObject);
      done();
    });
    it('Should return a object with displayed_tags if there is current tags', function (done) {
      const tagToAdd = 'tag to be added';
      const currentTags = ['previous tag1', 'previous tag2'];
      const analyticsObject = analyticsHelper.analyticsAddTagObject(tagToAdd, currentTags, 'context');
      const expectedObject = {
        'event': 'search_preference_input',
        'preference_input': 'tag to be added',
        'added_tags': 'tag to be added',
        'displayed_tags': 'previous-tag1,previous-tag2,tag-to-be-added',
        'context': 'context'
      };
      expect(analyticsObject).to.deep.equal(expectedObject);
      done();
    });
  });
  describe('Remove tag analytics object', function () {
    it('Should return a tag dismissed event object', function (done) {
      const tagToRemove = 'tagToRemove';
      const currentTags = ['another tag'];
      const analyticsObject = analyticsHelper.analyticsRemoveTagObject(tagToRemove, currentTags);
      const expectedObject = {
        event: 'tag_dismissed',
        dismissed_tag: 'tagToRemove',
        displayed_tags: 'another-tag'
      };
      expect(analyticsObject).to.deep.equal(expectedObject);
      done();
    });
  });
  describe('Add to cart analytics object', function () {
    it('Should return an addToCart analytic object to register spies.dk links clicks', function (done) {
      const packageOfferObject = {
        provider: {
          reference: 'packageSKU'
        },
        destinationName: 'name',
        destinationCode: 'code',
        departureCode: 'depCode'
      };
      const analyticsObject = analyticsHelper.analyticsAddToCart(packageOfferObject);
      const expectedObject = {
        event: 'addToCart',
        ecommerce: {
          add: {
            actionField: { list: 'inspirational search feed' },
            products: [{
              id: 'packageSKU',
              brand: 'hotel_tile',
              dimension11: 'code',
              dimension12: 'name',
              dimension13: 'depCode'
            }]
          }
        }
      };
      expect(analyticsObject).to.deep.equal(expectedObject);
      done();
    });
  });
  describe('Add analytics Impression objects', function () {
    it('Should add a new impression if there is no previous item impression', function (done) {
      const item = fixtures.package.item;
      const dataLayer = [];
      const impressionsTimestamp = new Map();
      analyticsHelper.addAnalyticsImpression(item, dataLayer, impressionsTimestamp);
      expect(dataLayer).to.have.length(1);
      done();
    });
    it('Should not add a new impression if there is already one within the last 30 seconds', function (done) {
      const item = fixtures.package.item;
      const dataLayer = [];
      const date10secsago = (new Date()).getTime() - 10000;
      const impressionsTimestamp = new Map();
      impressionsTimestamp.set('fixtureReference', date10secsago);
      analyticsHelper.addAnalyticsImpression(item, dataLayer, impressionsTimestamp);
      expect(dataLayer).to.have.length(0);
      expect(impressionsTimestamp.get('fixtureReference')).to.be.equal(date10secsago);
      done();
    });
    it('Should add a new impression if there is more than 30 seconds since last impression', function (done) {
      const item = fixtures.package.item;
      const dataLayer = [];
      const date40secsago = (new Date()).getTime() - 40000;
      const impressionsTimestamp = new Map();
      impressionsTimestamp.set('fixtureReference', date40secsago);
      analyticsHelper.addAnalyticsImpression(item, dataLayer, impressionsTimestamp);
      expect(dataLayer).to.have.length(1);
      expect(impressionsTimestamp.get('fixtureReference')).not.to.be.equal(date40secsago);
      done();
    });
  });
});

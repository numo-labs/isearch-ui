'use strict';

import * as analyticsHelper from '../../src/components/search-results/analytics-helper';
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
  });
});

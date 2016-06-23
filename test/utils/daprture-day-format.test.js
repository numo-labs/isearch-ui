import { expect } from 'chai';
import departOnFriday from '../../src/utils/departure-day-format';
import moment from 'moment';

describe('Utils', function () {
  describe('departOnFriday', function () {
    it('should return the nearest Friday from today', function (done) {
      const date = moment();
      const dayOfTheWeekNumber = departOnFriday(date).day();
      expect(dayOfTheWeekNumber).to.equal(5);
      done();
    });
  });
});

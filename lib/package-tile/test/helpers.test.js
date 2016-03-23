import { expect } from 'chai';
import { constructUrl, parseDate, imgCropper, imgDomain } from '../helpers.js';

describe('PackageTile Helper: constructUrl', () => {
  it('returns the original url if it contains the string `/s.php?uid`', (done) => {
    const url = constructUrl('/s.php?uid');
    expect(url).to.equal(url);
    done();
  });
  it('returns the original url prepended with the image cropper if it starts with http`', (done) => {
    const url = constructUrl('http');
    expect(url).to.equal(`${imgCropper}http`);
    done();
  });
  it('returns the original url prepended with the image domain if it neither starts with http or contains `/s.php?uid`', (done) => {
    const url = constructUrl('');
    expect(url).to.equal(`${imgDomain}`);
    done();
  });
});

describe('PackageTile Helper: parseDate test', () => {
  it('formats the javascript date correctly', (done) => {
    const date = parseDate('2016-06-13T06:10');
    expect(date).to.equal('13 June 2016');
    done();
  });
  it('adds a leading zero if the day is less than 10', (done) => {
    const date = parseDate('2016-06-07T06:10');
    expect(date).to.equal('07 June 2016');
    done();
  });
});

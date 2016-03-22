import expect from 'expect';
import { constructUrl, parseDate, imgCropper, imgDomain } from '../helpers.js';

describe('constructUrl test', () => {
  it('returns the original url if it contains the string `/s.php?uid`', (done) => {
    const url = constructUrl('/s.php?uid');
    expect(url).toEqual(url);
    done();
  });
  it('returns the original url prepended with the image cropper if it starts with http`', (done) => {
    const url = constructUrl('http');
    expect(url).toEqual(`${imgCropper}http`);
    done();
  });
  it('returns the original url prepended with the image domain if it neither starts with http or contains `/s.php?uid`', (done) => {
    const url = constructUrl('');
    expect(url).toEqual(`${imgDomain}`);
    done();
  });
});

describe('parseDate test', () => {
  it('formats the javascript date correctly', (done) => {
    const date = parseDate('2016-06-13T06:10');
    expect(date).toEqual('13 June 2016');
    done();
  });
  it('adds a leading zero if the day is less than 10', (done) => {
    const date = parseDate('2016-06-07T06:10');
    expect(date).toEqual('07 June 2016');
    done();
  });
});

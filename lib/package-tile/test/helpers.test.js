import expect from 'expect';
import { constructUrl, parseDate, imgCropper, imgDomain } from '../helpers.js';

describe('URL constructor test', () => {
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

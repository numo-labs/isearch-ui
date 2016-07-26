// exported for testing
export const imgDomain = 'https://scdn3.thomascook.com/crop?maxWidth=400&maxHeight=0&imageUrl=http://cdn.thomascook.com';
export const imgCropper = 'https://scdn3.thomascook.com/crop?maxWidth=400&maxHeight=0&imageUrl=';
import moment from 'moment';

export function constructUrl (uri) {
  // If the url is a cropper service, just change the size
  if (uri.indexOf('/s.php?uid') > -1) {
    return uri;
  } else if (uri.indexOf('http') === 0) {
    return imgCropper + uri;
  } else {
    return imgDomain + uri;
  }
}

export function parseDate (localDate) {
  const months = ['Jan', 'Feb', 'Marts', 'Apr', 'Maj', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dec'];
  const date = moment(localDate).get('date');
  const month = moment(localDate).get('month');
  return date + '. ' + months[month];
}

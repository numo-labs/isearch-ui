// exported for testing
export const imgDomain = 'https://scdn3.thomascook.com/crop?maxWidth=400&maxHeight=0&imageUrl=http://cdn.thomascook.com';
export const imgCropper = 'https://scdn3.thomascook.com/crop?maxWidth=400&maxHeight=0&imageUrl=';

export function constructUrl (uri) {
  // If the url is a cropper service, just change the size
  if (uri.indexOf('/s.php?uid') > -1) {
    return uri;
  } else if (uri.startsWith('http')) {
    return imgCropper + uri;
  } else {
    return imgDomain + uri;
  }
}

export function parseDate (localDate) {
  const month = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const ms = Date.parse(localDate);

  let dd = new Date(ms).getDate();
  let mm = new Date(ms).getMonth();
  let yr = new Date(ms).getFullYear();

  if (dd < 10) dd = '0' + dd;

  return dd + ' ' + month[mm] + ' ' + yr;
}

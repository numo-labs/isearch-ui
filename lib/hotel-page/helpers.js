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

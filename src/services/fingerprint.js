import * as FingerprintActions from '../actions/fingerprint.js';

/**
* Function that checks if a fingerprint is present in local storage or otherwise
* creates a fingerprint
* @param {Function} - actionCreatorBinder - function that takes an action
* and binds it to dispatch
*/

export function initialise (actionCreatorBinder) {
  const { setFingerprint } = actionCreatorBinder(FingerprintActions);
  const existingFingerprint = localStorage.getItem('fingerprint');
  if (existingFingerprint) {
    console.log('existing fingerprint', existingFingerprint);
    setFingerprint(existingFingerprint);
  } else {
    const fingerprint = createFingerprint();
    localStorage.setItem('fingerprint', fingerprint);
    setFingerprint(fingerprint);
  }
}

/**
* Function that generates a unique id based on window properties
*/

export function createFingerprint () {
  const nav = window.navigator;
  const screen = window.screen;
  let guid = nav.mimeTypes.length;
  guid += nav.userAgent.replace(/\D+/g, '');
  guid += nav.plugins.length;
  guid += screen.height || '';
  guid += screen.width || '';
  guid += screen.pixelDepth || '';
  return guid;
}

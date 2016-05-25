import { SET_FINGERPRINT } from '../constants/actionTypes.js';

export function setFingerprint (fingerprint) {
  return {
    type: SET_FINGERPRINT,
    fingerprint
  };
}

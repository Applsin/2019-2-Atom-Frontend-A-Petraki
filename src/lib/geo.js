/* eslint-disable no-console */

export function geo(callbackSuccess, callbackError = null) {
  if ('geolocation' in navigator) {
    const geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    };

    navigator.geolocation.getCurrentPosition(
      callbackSuccess,
      callbackError,
      geoOptions,
    );
  } else if (callbackError) { callbackError('Permisition denied'); }
}

export function geo(callbackSuccess, callbackError = null) {
  if ('geolocation' in navigator) {
    const geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 3600,
      timeout: 36000,
    };
    navigator.geolocation.getCurrentPosition(
      callbackSuccess,
      geoOptions,
    );
  } else if (callbackError) { callbackError('No permission'); }
}

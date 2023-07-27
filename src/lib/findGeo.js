export const geoPosition = {
  latitude: 0,
  longitude: 0,
};

navigator.geolocation.getCurrentPosition((position) => {
  geoPosition.latitude = position.coords.latitude;
  geoPosition.longitude = position.coords.longitude;
});


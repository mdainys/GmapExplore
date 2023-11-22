const MapInfo = ({ currentLocation, distance }) => {
  return (
    <div>
      <h3>Marker current location:</h3>
      <p>Longitude: {currentLocation.longitude.toFixed(6)}</p>
      <p>Latitude: {currentLocation.latitude.toFixed(6)}</p>
      <p>Distance between markers: {distance} meters</p>
    </div>
  );
};

export default MapInfo;

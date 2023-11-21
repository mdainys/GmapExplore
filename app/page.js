"use client";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL from "react-map-gl";
import Map from "react-map-gl";

function Home() {
  const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  console.log(MapboxAccessToken);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 55.6104488,
    longitude: 26.4377098,
    zoom: 15,
  });

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const { latitude, longitude } = position.coords;
  //     setLatitude(latitude);
  //     setLongitude(longitude);
  //     console.log(latitude);
  //     console.log(longitude);
  //   });
  // }, []);

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1>Gmap Explorer</h1>
      <Map
        {...viewport}
        mapboxAccessToken={MapboxAccessToken}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </main>
  );
}

export default Home;

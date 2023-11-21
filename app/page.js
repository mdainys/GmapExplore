"use client";
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-24, 42],
        zoom: 1,
      });

      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });

      geolocateControl.on("geolocate", (event) => {
        const { longitude, latitude } = event.coords;

        setCurrentLocation({ longitude, latitude });

        newMap.setCenter([longitude, latitude]);
      });

      newMap.addControl(geolocateControl);

      setMap(newMap);

      // Map Navigation Button's
      const nav = new mapboxgl.NavigationControl({
        visualizePitch: true,
      });
      newMap.addControl(nav, "bottom-right");
    };

    initializeMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <>
      <div>
        <h3>Marker current location:</h3>
        <p>Longitude: {currentLocation.longitude.toFixed(6)}</p>
        <p>Latitude: {currentLocation.latitude.toFixed(6)}</p>
      </div>
      <div id="map" style={{ width: "80%", height: "80vh" }} />
    </>
  );
};

export default Map;

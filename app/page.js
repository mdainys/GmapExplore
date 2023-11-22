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
  const [draggableMarker, setDraggableMarker] = useState(null);
  const [distance, setDistance] = useState(null);

  const calculateDistance = (point1, point2) => {
    const R = 6371;
    const dLat = (point2.latitude - point1.latitude) * (Math.PI / 180);
    const dLon = (point2.longitude - point1.longitude) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(point1.latitude * (Math.PI / 180)) *
        Math.cos(point2.latitude * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/marius-dainys/clp9few1a001k01r558qmgu8l",
        center: [26.432730917247454, 55.60407906787367],
        zoom: 15,
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

      const newDraggableMarker = new mapboxgl.Marker({
        color: "#F70776",
        draggable: true,
      })
        .setLngLat([26.432730917247454, 55.60407906787367])
        .addTo(newMap);
      setMap(newMap);
      setDraggableMarker(newDraggableMarker);

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

  useEffect(() => {
    const handleMove = () => {
      if (draggableMarker) {
        const markerLngLat = draggableMarker.getLngLat();
        const distance = calculateDistance(currentLocation, {
          longitude: markerLngLat.lng,
          latitude: markerLngLat.lat,
        });
        setDistance(distance.toFixed(2));
      }
    };

    if (draggableMarker) {
      draggableMarker.on("dragend", handleMove);
      map.on("move", handleMove);
    }

    return () => {
      if (draggableMarker) {
        draggableMarker.off("dragend", handleMove);
        map.off("move", handleMove);
      }
    };
  }, [draggableMarker, currentLocation, map]);

  return (
    <>
      <div>
        <h3>Marker current location:</h3>
        <p>Longitude: {currentLocation.longitude.toFixed(6)}</p>
        <p>Latitude: {currentLocation.latitude.toFixed(6)}</p>
        <p>Distance between markers: {distance} km</p>
      </div>
      <div id="map" style={{ width: "80%", height: "80vh" }} />
    </>
  );
};

export default Map;

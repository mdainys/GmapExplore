"use client";
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyaXVzLWRhaW55cyIsImEiOiJjbHA4M2hqNXYyZm9vMmlxdTdscnNlMXY3In0.8aAukwmoAfhAAFRpY59-Mw";

const Map = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [draggableMarker, setDraggableMarker] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-24, 42],
        zoom: 1,
      });

      newMap.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );

      const newDraggableMarker = new mapboxgl.Marker({
        color: "#f70776",
        draggable: true,
      })
        .setLngLat([26.432730917247454, 55.60407906787367])
        .addTo(newMap);

      setMap(newMap);
      setDraggableMarker(newDraggableMarker);

      newMap.on("click", handleMapClick);
    };

    initializeMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []); // Only run this effect on mount and unmount

  const handleMapClick = (event) => {
    const { lng, lat } = event.lngLat;

    // Update the draggable marker's position
    if (draggableMarker) {
      draggableMarker.setLngLat([lng, lat]);
      setMarkers(newMarkers);
    }

    const newMarkers = [...markers, { lng, lat }];
    setMarkers(newMarkers);
  };

  return (
    <>
      <div>
        <h3>Marker coordinate:</h3>
      </div>
      {markers.map((marker, index) => (
        <li
          key={index}
        >{`Longitude: ${marker.lng}, Latitude: ${marker.lat}`}</li>
      ))}
      <div id="map" style={{ width: "80%", height: "80vh" }} />
    </>
  );
};

export default Map;

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
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
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

      // Create draggable marker
      const newDraggableMarker = new mapboxgl.Marker({
        color: "#FFFFFF",
        draggable: true,
      })
        .setLngLat([26.432618433465706, 55.60395540961798])
        .addTo(newMap);

      setMap(newMap);
      setDraggableMarker(newDraggableMarker);

      newMap.on("click", handleMapClick);

      // Listen for the dragend event on the draggable marker
      newDraggableMarker.on("dragend", handleMarkerDragEnd);
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
      const newMarkers = [...markers, { lng, lat }];
      setMarkers(newMarkers);
    }
  };

  const handleMarkerDragEnd = () => {
    // Get the new position of the draggable marker
    const { lng, lat } = draggableMarker.getLngLat();

    // Update the list of markers with the new position
    const newMarkers = [...markers, { lng, lat }];
    setMarkers(newMarkers);
  };

  return (
    <>
      <div>
        <h3>Marker coordinate:</h3>
      </div>
      {markers.map((marker, index) => (
        <ul key={index}>
          <li>{`Longitude: ${marker.lng}`}</li>
          <li>{`Latitude: ${marker.lat}`}</li>
        </ul>
      ))}
      <div id="map" style={{ width: "80%", height: "80vh" }} />
    </>
  );
};

export default Map;

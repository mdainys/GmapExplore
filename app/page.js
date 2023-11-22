"use client";
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapInfo from "@/components/MapInfo";
import { calculateDistance } from "./utils/helpers";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [draggableMarker, setDraggableMarker] = useState(null);
  const [distance, setDistance] = useState(null);
  const [approachAlertShown, setApproachAlertShown] = useState(false);

  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/marius-dainys/clp87nlcx01tq01o4hv8ybcc1",
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

        // Check if the distance is below a certain threshold (e.g., 10 meters)
        const threshold = 10;
        if (distance < threshold && !approachAlertShown) {
          setApproachAlertShown(true);
          alert("Marker approached!");
        } else if (distance >= threshold && approachAlertShown) {
          // Reset the flag when the distance is above the threshold again
          setApproachAlertShown(false);
        }
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
  }, [draggableMarker, currentLocation, map, approachAlertShown]);

  return (
    <>
      <MapInfo currentLocation={currentLocation} distance={distance} />
      <div id="map" style={{ width: "80%", height: "80vh" }} />
    </>
  );
};

export default Map;

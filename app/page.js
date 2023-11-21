"use client";
import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyaXVzLWRhaW55cyIsImEiOiJjbHA4M2hqNXYyZm9vMmlxdTdscnNlMXY3In0.8aAukwmoAfhAAFRpY59-Mw";

const Map = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [-24, 42],
      zoom: 1,
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },

        trackUserLocation: true,

        showUserHeading: true,
      })
    );

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
};

export default Map;

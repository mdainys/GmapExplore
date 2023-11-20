"use client";
import Gmap from "@/components/Gmap";
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const defaultCenter = {
    lat: latitude,
    lng: longitude,
  };

  const { isLoaded: gmapIsLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    });
  }, []);
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1>Gmap Explorer</h1>
      {gmapIsLoaded ? <Gmap center={defaultCenter} /> : <h2>Is Loading</h2>}
    </main>
  );
}

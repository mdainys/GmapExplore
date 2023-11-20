"use client";
import Gmap from "@/components/Gmap";
import { useJsApiLoader } from "@react-google-maps/api";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const defaultCenter = {
    lat: 54.6947,
    lng: 25.29819,
  };

  const { isLoaded: gmapIsLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Gmap Explorer</h1>
      {gmapIsLoaded ? <Gmap center={defaultCenter} /> : <h2>Is Loading</h2>}
    </main>
  );
}

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Obtener data
  useEffect(() => {
    const coordinates = [
      { lat: 40.712776, lng: -74.005974 }, 
      { lat: 34.052235, lng: -118.243683 }, 
      { lat: 51.507351, lng: -0.127758 },
    ];

    if (!mapRef.current) {
      const map = L.map('map').setView([coordinates[0].lat, coordinates[0].lng], 3);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      mapRef.current = map;

      const marker = L.marker([coordinates[0].lat, coordinates[0].lng]).addTo(map);
      markerRef.current = marker;
      markerRef.current.currentIndex = 0;
    }

    const intervalId = setInterval(() => {
      const currentIndex = markerRef.current.currentIndex;
      const nextIndex = (currentIndex + 1) % coordinates.length;
      const nextCoordinates = coordinates[nextIndex];
      markerRef.current.setLatLng([nextCoordinates.lat, nextCoordinates.lng]);
      mapRef.current.setView([nextCoordinates.lat, nextCoordinates.lng], 3);
      markerRef.current.currentIndex = nextIndex;
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
}

export default MapComponent;

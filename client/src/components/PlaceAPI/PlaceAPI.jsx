import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoiaml0aHVuIiwiYSI6ImNsaWEzZjg1NzBuMngzZHBnOWZzeTJ3eDMifQ.QUWNrEcjjYw_-HbBUDquhw';

export default function MapWithGeolocation() {
  const mapContainer = useRef(null);
const [latitude, setlatitude] = useState('')
const [longitude, setlongitude] = useState('')
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
setlatitude(position.coords.latitude)
setlongitude(position.coords.longitude)

    })
    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude,latitude], // Default center coordinates
      zoom: 13, // Default zoom level
    });

    // Add geolocate control to the map
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
      );
      
        var marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude]) // Example: New York City
        .addTo(map);
  }, [latitude,longitude]);

  return <div ref={mapContainer} style={{ height: '100vh' }} />;
}

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Axios from '../../axios';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1Ijoiaml0aHVuIiwiYSI6ImNsaWEzZjg1NzBuMngzZHBnOWZzeTJ3eDMifQ.QUWNrEcjjYw_-HbBUDquhw';

export default function MapWithGeolocation() {
  const mapContainer = useRef(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.log('Error getting geolocation:', error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude, latitude],
        zoom: 13,
      });

      map.on('load', () => {
        Axios.get('/admin/allmechanics').then((response) => {
          const mechanics = response.data.mechanic;
          mechanics.forEach((mechanic) => {
            const location = mechanic.location;

            axios
              .get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                  location
                )}.json`,
                {
                  params: {
                    access_token: mapboxgl.accessToken,
                    limit: 1,
                  },
                }
              )
              .then((geocodingResponse) => {
                const features = geocodingResponse.data.features;
                if (features.length > 0) {
                  const coordinates = features[0].geometry.coordinates;
                  const userLocation = [longitude, latitude];
                  const distance = calculateDistance(userLocation, coordinates);
                  if (distance <= 10000) {
                    const marker = new mapboxgl.Marker({ color: 'red' })
                      .setLngLat(coordinates)
                      .addTo(map);

                    const popup = new mapboxgl.Popup({ closeOnClick: false }).setHTML(
                      `<h3>${mechanic.name}</h3><p>${mechanic.experience} years exp</p>`
                    );

                    marker.setPopup(popup);
                  }
                }
              });
          });
        });
      });
    }
  }, [latitude, longitude]);

  // Function to calculate the distance between two coordinates using the Haversine formula
  function calculateDistance(coord1, coord2) {
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance * 1000; // Convert distance to meters
  }

  return <div ref={mapContainer} style={{ height: '100vh' }} />;
}

import { accessToken } from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import ReactMapGL from 'react-map-gl/dist/esm/index.js';

accessToken = 'pk.eyJ1Ijoiaml0aHVuIiwiYSI6ImNsaWEzZjg1NzBuMngzZHBnOWZzeTJ3eDMifQ.QUWNrEcjjYw_-HbBUDquhw';

export default function PlaceAPI() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.geolocation);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const [viewport, setViewport] = useState({
    latitude: '11.2345587',
    longitude: '76.049183',
    zoom: 5
  });

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={accessToken}
        width='100%'
        height='100%'
        mapStyle='mapbox://styles/jithun/clij6b74p001w01pjddjl803b'
        onViewportChange={(newViewport) => setViewport(newViewport)}
      />
    </div>
  );
}

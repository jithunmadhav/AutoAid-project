import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Axios from '../../axios';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './Place.css'

mapboxgl.accessToken = 'pk.eyJ1Ijoiaml0aHVuIiwiYSI6ImNsaWEzZjg1NzBuMngzZHBnOWZzeTJ3eDMifQ.QUWNrEcjjYw_-HbBUDquhw';

export default function PlaceAPI(props) {
  console.log(props);
  const mapContainer = useRef(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [nearMechanic, setNearMechanic] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

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
        zoom: 11,
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

                    const mechanicData = {
                      ...mechanic,
                      coordinates,
                    };
                    setNearMechanic((prevMechanics) => [...prevMechanics, mechanicData]);
                  }
                }
              });
          });
        });
      });
    }
  }, [latitude, longitude]);

  function calculateDistance(coord1, coord2) {
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;

    const R = 6371;
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

    return distance * 1000;
  }

  // Pagination Logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = nearMechanic.slice(indexOfFirstCard, indexOfLastCard);

  const handleNextPage = () => {
    if (indexOfLastCard < nearMechanic.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div ref={mapContainer} style={{ height: '100vh' }} />

      <div className='cards-place'>
      <button    onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {currentCards.map((card, index) => (
          <Card key={index} sx={{ maxWidth: 345 }} style={{ borderRadius: '15px', width: '280px', marginRight: '50px', marginLeft:'50px' }}>
            <CardActionArea style={{ backgroundColor:'#ada7a7' }}>
              <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'Monomaniac One, sans-serif', textAlign: 'center', fontSize: '35px' }}>
                {card.name}
              </Typography>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'Monomaniac One, sans-serif', textAlign: 'center' }}>
                  {card.experience} years exp
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
         <button   onClick={handleNextPage} disabled={indexOfLastCard >= nearMechanic.length}>
          Next
        </button>
      </div>
      
    </div>
  );
}

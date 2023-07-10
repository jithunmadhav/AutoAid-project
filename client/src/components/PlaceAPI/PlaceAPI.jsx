import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Axios from '../../axios';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './Place.css'
import BookingProfile from '../BookingProfile/BookingProfile';
import { useLocation } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX;

export default function PlaceAPI() {
  const location = useLocation();
  const service = location.state.serviceName;
  console.log(service);
  const mapContainer = useRef(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [nearMechanic, setNearMechanic] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openProfile, setOpenProfile] = useState(false);
  const [data, setData] = useState('');
  const [cardsPerPage, setCardsPerPage] = useState(4); // Initial value set to 4

  const viewProfile = (data) => {
    setData(data);
    setOpenProfile(true);
  };

  useEffect(() => {
    // axios.get('https://ipapi.co/json').then((response)=>{
    //   console.log(response);
    //   setLatitude(response.data.latitude);
    //   setLongitude(response.data.longitude);
    // })
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
        zoom: 12,
      });
      const marker = new mapboxgl.Marker({ color: 'blue' })
      .setLngLat([longitude, latitude])
      .addTo(map);
      
      map.on('load', () => {
        Axios.get(`/user/allmechanics/${service}`).then((response) => {
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
                console.log(geocodingResponse);
                const features = geocodingResponse.data.features;
                if (features.length > 0) {
                  const coordinates = features[0].geometry.coordinates;
                  const userLocation = [longitude, latitude];
                  const distance = calculateDistance(userLocation, coordinates);
                  if (distance <= 10000) {
                    mechanic.distance=(distance/1000).toFixed(1);
                    mechanic.selectedService=service;
                    console.log("DISTANCE :",mechanic);
                    const marker = new mapboxgl.Marker({ color: 'red' })
                      .setLngLat(coordinates)
                      .addTo(map);
                      const popup = new mapboxgl.Popup({ closeOnClick: false }).setHTML(
                        `<h3>${mechanic.name}</h3><p>${mechanic.experience} years exp</p>`
                      );
      
                      marker.setPopup(popup);
                    const mechanicData = {
                      ...mechanic,
                      coordinates,
                    };
                    setNearMechanic((prevMechanics) => [...prevMechanics, mechanicData]);
                  }
                }
              });
          });
        }).catch(err=>console.log(err))
      });
    }
  }, [latitude, longitude,service]);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setCardsPerPage(1);
      } else {
        setCardsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    openProfile ? <BookingProfile data={{...data}} /> :
    <div>
      <div ref={mapContainer} style={{ height: '100vh' }} />

      <div className='cards-place'>
        <div onClick={handlePrevPage} disabled={currentPage === 1}>
        <img style={{ width:'50px',marginTop:'27px',cursor:'pointer' }} src="https://cdn-icons-png.flaticon.com/512/467/467274.png" alt="" />
        </div>
       
        {currentCards.map((card, index) => (
          <Card key={index} sx={{ maxWidth: 345 }} className='card-body-place'>
            <CardActionArea  onClick={()=>viewProfile(card)} style={{ backgroundColor:'#21252900' }}>
              <Typography gutterBottom variant="h5" component="div" className='card-text'>
                {card.name}
              </Typography>
              <CardContent style={{ padding:'0' }}>
                <Typography gutterBottom variant="h5" component="div" className='card-text-sp'>
                  {card.experience} years exp
                </Typography>
                <Typography gutterBottom variant="h5" component="div" className='card-text'>
                  {card.distance} KM
                </Typography>
                <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'Monomaniac One, sans-serif', display:'flex', justifyContent:'center' }}>
                <Stack  spacing={1}>
               <Rating name="size-small" defaultValue={card.rating} size="small" readOnly />
               </Stack>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        <div onClick={handleNextPage} disabled={indexOfLastCard >= nearMechanic.length}>
        <img style={{ width:'50px',marginTop:'27px',cursor:'pointer' }} src="https://cdn-icons-png.flaticon.com/512/467/467282.png" alt="" />
        </div >
       
      </div>
      
    </div> 
  );
}

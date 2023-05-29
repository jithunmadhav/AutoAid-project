import React from 'react';
import './Home.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Home() {
  // Define an array of data for the cards
  const cardData = [
    {
      title: 'Breakdown support',
      image: 'https://img.freepik.com/free-vector/car-crash-concept-illustration_114360-7980.jpg?w=1380&t=st=1685293661~exp=1685294261~hmac=461a8e29e0b5d90f3bf7f69d81dd4c142e3d42101352d3169a41e96d7ccfaa9d',
    },
    {
      title: '2 wheeler support',
      image: 'https://img.freepik.com/premium-vector/bearded-hipster-guy-motorcycle-customization-service-vector-flat-illustration-mechanic-man-assemble-parts-motorbike-garage-isolated-white-male-biker-enjoying-hobby-work-with-transport_198278-8929.jpg?w=996',
    },
    {
      title: '4,6 wheeler support',
      image: 'https://img.freepik.com/free-vector/auto-mechanic-repairing-vehicle-engine-isolated-flat-vector-illustration-cartoon-man-fixing-checking-car-with-open-hood-garage_74855-8227.jpg?size=626&ext=jpg',
    },
    {
      title: 'Washing',
      image: 'https://img.freepik.com/premium-vector/car-wash-service-flat-design-illustration-workers-washing-automobile-using-sponges-soap-water-background-poster-banner_2175-1980.jpg?size=626&ext=jpg',
    },
  ];

  return (
    <>
      <div className='background'>
        <div style={{ width: '50%' }}>
          <img className='background-img' src="https://autoaid.in/auto-aid-logo.png" alt="logo" />
          <h1>
            <span className="animated-text">Drive with confidence, your virtual garage is just a tap away</span>
          </h1>
        </div>
        <div style={{ width: '50%' }}>
          <h1 className='home-quotes'>&emsp;Any Time <br/> &nbsp; &nbsp;Any Where <br/> Aid For Vehicle</h1>
        </div>
      </div>
      <div className='secondPage'>
        <h1 className='services'>Our Services</h1>
        <div className='cards'>
        {cardData.map((card, index) => (
          <Card key={index} sx={{ maxWidth: 345 }} style={{ borderRadius:'15px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                style={{ height:'240px' }}
                image={card.image}
                alt={card.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ fontFamily:'Monomaniac One, sans-serif',textAlign:'center'}}>
                  {card.title}
                  
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        </div>
      </div>
      <div className='Third-page'>
        <h2 className='whyAutoAid'> Why AutoAid ?</h2>
        <p className='whyAutoAid' style={{ fontSize:'20px' }}> Auto Aid, as the name suggests, acts as a helping hand for Automobile users. 
          It is an app to help users connect to Automotive Service Providing firms and skilled mechanics.</p>
          <p className='whyAutoAid' style={{ fontSize:'20px' }}>Using Auto Aid, users can search for the best and reasonable, timely service provider at their desired locations.
             They need to choose their nearby area from the Active Service <br/> Providers List.</p>
          <p className='whyAutoAid' style={{ fontSize:'20px' }}>In short, the user can carry a garage on his phone. 
              Helping our users to enjoy a hassle-free voyage across Kerala is the primary intention behind the development of Auto Aid.</p>
      </div>
    </>
  );
}

export default Home;

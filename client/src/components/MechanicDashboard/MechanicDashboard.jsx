import React from 'react';
import './MechanicDashboard.css'
  import "bootstrap/dist/css/bootstrap.min.css";
  import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function MechanicDashboard() {
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
   
  ];
  return (
   <>
  <div className='dashboard-background'>
    <div className='first-div'>
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
  </div>
   </>
  )
}

export default MechanicDashboard

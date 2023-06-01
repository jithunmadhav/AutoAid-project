import React from 'react';
import './MechanicDashboard.css'
  import "bootstrap/dist/css/bootstrap.min.css";
  import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function MechanicDashboard() {
  const cardData = [
    {
      title: 'Breakdown support',
      value:0
    },
    {
      title: '2 wheeler support',
      value:0
    },
    {
      title: '4,6 wheeler support',
      value:0
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
            <Typography gutterBottom variant="h5" component="div" style={{ fontFamily:'Monomaniac One, sans-serif',textAlign:'center'}}>
                  {card.title}
                  
                </Typography>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ fontFamily:'Monomaniac One, sans-serif',textAlign:'center'}}>
                  {card.value}
                  
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

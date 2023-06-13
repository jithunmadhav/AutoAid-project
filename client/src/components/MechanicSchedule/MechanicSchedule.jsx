import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './MechanicSchedule.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
 
 

function MechanicDashboard() {
  const cardData = [
    {
      title: 'Total Revenue',
      value:0
    },
    {
      title: 'Pending Appointments',
      value:0
    },
    {
      title: 'Completed Appointments',
      value:0
    },
    
   
  ];
 

  return (
   <>
  <div className='dashboard-background'>
 
    <div className='cards-mechanics'>
        {cardData.map((card, index) => (
          <Card key={index} sx={{ maxWidth: 180 }} style={{ borderRadius:'15px' ,width:'280px'}}>
            <CardActionArea>
            <Typography gutterBottom variant="h5" component="div" style={{ fontFamily:'Monomaniac One, sans-serif',textAlign:'center',fontSize:'35px'}}>
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
 
   </>
  )
}

export default MechanicDashboard

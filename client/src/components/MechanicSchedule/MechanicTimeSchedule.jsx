import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './MechanicSchedule.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function MechanicTimeSchedule() {
  const cardData = [];

  for (let i = 9; i <= 23; i++) {
    const hour12 = i > 12 ? i - 12 : i;
    const meridiem = i >= 12 ? 'PM' : 'AM';
    const time = hour12.toString().padStart(2, '0') + ':00 ' + meridiem;
    cardData.push({
      title: 'Time Slot',
      value: time
    });
  }

  return (
    <div className='dashboard-background'>
      <div className='cards-mechanics'>
        {cardData.map((card, index) => (
          <Card key={index} sx={{ maxWidth: 180 }} style={{ borderRadius: '15px', width: '280px' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'ui-monospace', textAlign: 'center' }}>
                  {card.value}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MechanicTimeSchedule;

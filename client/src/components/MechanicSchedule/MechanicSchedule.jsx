import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './MechanicSchedule.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function MechanicDashboard() {
  const currentDate = new Date();
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const cardData = [];
  const timeSlots = [];

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    const dayName = daysOfWeek[date.getDay()];
    const dayNumber = date.getDate();
    cardData.push({
      title: dayName,
      value: dayNumber
    });
  }

  for (let i = 9; i <= 23; i++) {
    const hour12 = i > 12 ? i - 12 : i;
    const meridiem = i >= 12 ? 'PM' : 'AM';
    const time = hour12.toString().padStart(2, '0') + ':00 ' + meridiem;
    timeSlots.push({
      value: time
    });
  }

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  return (
    <>
      <div className='dashboard-background'>
        <h5 className='date-heading'>Date :</h5>
        <div className='cards-mechanics'>
          {cardData.map((card, index) => (
            <Card
              key={index}
              sx={{ maxWidth: 180 }}
              style={{
                borderRadius: '15px',
                width: '280px',
                border: selectedCardIndex === index ? '4px solid green' : 'none'
              }}
              onClick={() => handleCardClick(index)}
            >
              <CardActionArea>
                <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'Monomaniac One, sans-serif', textAlign: 'center', fontSize: '35px' }}>
                  {card.title}
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'Monomaniac One, sans-serif', textAlign: 'center' }}>
                    {card.value}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
        <div className='cards-mechanics-time'>
          {timeSlots.map((card, index) => (
            <Card key={index} sx={{ maxWidth: 180 }} style={{ borderRadius: '15px', width: '280px', height: '70px' }}>
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
    </>
  )
}

export default MechanicDashboard;

import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './MechanicSchedule.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from '../../axios';
import { useSelector } from 'react-redux';

function MechanicDashboard() {
  const {mechanic} = useSelector(state => state)
  const mechanic_id=mechanic.details[0]._id;
  const [scheduledDate, setscheduledDate] = useState(mechanic.details[0].scheduledDate)
  console.log(scheduledDate);
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedTime, setselectedTime] = useState([])
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const cardData = [];
  const timeSlots = [];

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    const dayName = daysOfWeek[date.getDay()];
    const dayNumber = date.getDate();
    cardData.push({
      date: date,
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

  const handleDateCardClick = (index, date) => {
    setSelectedDate(date);
    setSelectedCardIndex(index);
  };

  const handleTimeSlotClick = (index,data) => {
    const selectedSlots = [...selectedTimeSlots];
    const existingIndex = selectedSlots.indexOf(index);

    if (existingIndex !== -1) {
      // Time slot already selected, remove it
      selectedSlots.splice(existingIndex, 1);
    } else {
      // Time slot not selected, add it
      selectedSlots.push(index);
      setselectedTime([...selectedTime,data])
    }

    setSelectedTimeSlots(selectedSlots);
  };
console.log(selectedDate,"****************",selectedTime);

const handlesubmit=()=>{
  axios.post('/mechanic/scheduleddate',{selectedDate,selectedTime,mechanic_id}).then((response)=>{
    console.log(response.data);
  }).catch(err=>{
    console.log(err);
  })
}
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
                border: selectedCardIndex === index ? '4px solid red' : 'none'
              }}
              onClick={() => handleDateCardClick(index, card.date)}
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
            <Card
              key={index}
              sx={{ maxWidth: 180 }}
              style={{
                borderRadius: '15px',
                width: '280px',
                height: '70px',
                border: selectedTimeSlots.includes(index) ? '4px solid red' : 'none',
              }}
              onClick={() => handleTimeSlotClick(index,card)}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'unset', textAlign: 'center',fontSize:'25px' }}>
                    {card.value}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
        <button onClick={handlesubmit} className='mechanic-schedule-btn'>SAVE</button>
      </div>
    </>
  )
}

export default MechanicDashboard;

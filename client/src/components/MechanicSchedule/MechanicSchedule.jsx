import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './MechanicSchedule.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from '../../axios';
import { useSelector } from 'react-redux';

function MechanicDashboard() {
  const { mechanic } = useSelector(state => state);
  const mechanic_id = mechanic.details[0]._id;
  const [scheduledDate, setScheduledDate] = useState(mechanic.details[0].scheduledDate);
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [matchedIndex, setmatchedIndex] = useState([]);
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

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    const CurrDate = date;
    const dayName = daysOfWeek[date.getDay()];
    const dayNumber = date.getDate();

    const dateObj = {
      date: CurrDate,
      dayName: dayName,
      dayNumber: dayNumber,
      slots: []
    };

    for (let j = 9; j <= 23; j++) {
      const hour12 = j > 12 ? j - 12 : j;
      const meridiem = j >= 12 ? 'PM' : 'AM';
      const time = hour12.toString().padStart(2, '0') + ':00 ' + meridiem;

      dateObj.slots.push({
        value: time
      });
    }

    timeSlots.push(dateObj);
  }

  const [findDate, setFindDate] = useState(timeSlots[0].slots);

  const handleDateCardClick = async (index, date) => {
    const result = timeSlots.find(
      (slot) =>
        slot.date.toISOString().split('T')[0] ===
        date.toISOString().split('T')[0]
    );
    const selectResult = new Date(result.date).toISOString();

    for (const item of scheduledDate) {
      if (item.date.split('T')[0] === selectResult.split('T')[0]) {
        const matchingIndices = result.slots
          .filter((slot) =>
            item.selectedTime.some((time) => time.value === slot.value)
          )
          .map((_, index) => index);

        await setmatchedIndex(matchingIndices);
      }
    }

    setFindDate(result.slots);
    setSelectedDate(date);
    setSelectedCardIndex(index);
  };

  const handleTimeSlotClick = (index, data) => {
    const selectedSlots = [...selectedTimeSlots];
    const existingIndex = selectedSlots.indexOf(index);

    if (existingIndex !== -1) {
      selectedSlots.splice(existingIndex, 1);
    } else {
      selectedSlots.push(index);
      setSelectedTime([...selectedTime, data]);
    }

    setSelectedTimeSlots(selectedSlots);
  };

  const handleSubmit = () => {
    axios.post('/mechanic/scheduleddate', { selectedDate, selectedTime, mechanic_id })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("//////////---------",matchedIndex);
  }, [matchedIndex]);

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
          {findDate.map((card, index) => (
            <Card
              key={index}
              sx={{ maxWidth: 180 }}
              style={{
                borderRadius: '15px',
                width: '280px',
                height: '70px',
                border: selectedTimeSlots.includes(index) ? '4px solid red' : 'none',
              }}
              onClick={() => handleTimeSlotClick(index, card)}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'unset', textAlign: 'center', fontSize: '25px' }}>
                    {card.value}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
        <button onClick={handleSubmit} className='mechanic-schedule-btn'>SAVE</button>
      </div>
    </>
  )
}

export default MechanicDashboard;

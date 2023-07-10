import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './MechanicSchedule.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

function MechanicDashboard() {
  const { mechanic } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mechanic_id = mechanic.details[0]._id;
  const [visible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(false); // Add a refresh state
  const [scheduledDate, setScheduledDate] = useState(mechanic.details[0].scheduledDate);
  console.log("*********",scheduledDate);
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [matchedIndex, setMatchedIndex] = useState([]);
  const cardData = [];
  const timeSlots = [];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

  const handleDateCardClick = (index, date) => {
    const result = timeSlots.find(slot => slot.date.getTime() === date.getTime());
    const selectResult = new Date(result.date).toISOString();
    const matchingIndices = [];

    scheduledDate.forEach(item => {
      if (item.date.split('T')[0] === selectResult.split('T')[0]) {
        const indices = item.selectedTime
          .filter(time => time.index !== undefined)
          .map(time => result.slots.findIndex(slot => slot.value === time.value));
        matchingIndices.push(...indices);
        dispatch({ type: 'refresh' });
      }
    });

    setSelectedTime([]);
    setSelectedTimeSlots([]);
    setMatchedIndex(matchingIndices);

    setFindDate(result.slots);
    setSelectedDate(date);
    setSelectedCardIndex(index);
  };

  const handleTimeSlotClick = (index, data) => {
    const selectedSlots = [...selectedTimeSlots];
    const existingIndex = selectedSlots.indexOf(index);

    // Check if the slot is selectable
    if (findDate[index].selectable) {
      if (existingIndex !== -1) {
        selectedSlots.splice(existingIndex, 1);
      } else {
        selectedSlots.push(index);
        setSelectedTime([...selectedTime, data]);
      }

      setSelectedTimeSlots(selectedSlots);
    }
  };

  const handleSubmit = () => {
    const selecteddate = selectedDate.toISOString();
    axios
      .post('/mechanic/scheduleddate', { selecteddate, selectedTime, mechanic_id })
      .then(response => {
        if (!response.data.err) {
          const updatedFindDate = findDate.map((card, index) => {
            const backgroundColor = selectedTimeSlots.includes(index) ? '#999191' : 'none';
            const selectable = !selectedTimeSlots.includes(index);
            return { ...card, backgroundColor, selectable };
          });
           console.log("11111111",updatedFindDate);
          setVisible(!visible);
          
  
          // Update the scheduledDate state
          const updatedScheduledDate = [...scheduledDate, {
            date: selecteddate,
            selectedTime
          }];
          setScheduledDate(updatedScheduledDate);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  
  useEffect(() => {
    // Set initial selected date and slots
    if (scheduledDate.length > 0) {
      const firstSelectedDate = new Date(scheduledDate[0].date);
      setSelectedDate(firstSelectedDate);
      setSelectedCardIndex(0);

      const firstSelectedSlots = scheduledDate[0].selectedTime.map(time => {
        const index = findDate.findIndex(slot => slot.value === time.value);
        return { ...time, index };
      });
      setSelectedTime(firstSelectedSlots);

      const matchingIndices = firstSelectedSlots.map(slot => slot.index);
      setMatchedIndex(matchingIndices);
    }
  }, [scheduledDate]);

  useEffect(() => {
    const updatedFindDate = findDate.map((card, index) => {
      const backgroundColor = matchedIndex.includes(index) ? '#999191' : 'none';
      const selectable = !matchedIndex.includes(index);
      return { ...card, backgroundColor, selectable, index,booked:false };
    });
    setFindDate(updatedFindDate);
  }, [matchedIndex]);

  return (
    <>
      <div className='dashboard-background'>
        <h5 className='date-heading'>Date :</h5>
        <div className='cards-mechanics'>
          {cardData.map((card, index) => (
             <div className='card-inner'>
            <Card
              key={index}
              sx={{ maxWidth: 180 }}
              style={{
                border: selectedCardIndex === index ? '4px solid #1df11d' : 'none'
              }}
              className='card-body-schedule'
              onClick={() => handleDateCardClick(index, card.date)}
            >
              <CardActionArea>
                <Typography gutterBottom variant="h5" component="div" className='card-title'>
                  {card.title}
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div" className='card-value'>
                    {card.value}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </div>
          ))}
        </div>
        <div className='cards-mechanics-time'>
          {findDate.map((card, index) => (
            <Card
              key={index}
              sx={{ maxWidth: 180 }}
              className='card-time-body'
              style={{
                backgroundColor: card.backgroundColor,
                border: selectedTimeSlots.includes(index) ? '4px solid #1df11d' : 'none',
              }}
              onClick={() => handleTimeSlotClick(index, card)}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" className='card-time-font'>
                    {card.value}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
        <button onClick={() => setVisible(!visible)} className='mechanic-schedule-btn'>SAVE</button>
      </div>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)} className="custom-modal">
        <CModalBody className="custom-modal-body">
          <h4 style={{ textAlign: 'center', fontFamily: 'Monomaniac One, sans-serif' }}>Are you sure to save the slots</h4>
        </CModalBody>
        <CModalFooter style={{ justifyContent: 'space-evenly' }} className="custom-modal-footer">
          <CButton color="danger" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton onClick={handleSubmit} color="success">Confirm</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}

export default MechanicDashboard;

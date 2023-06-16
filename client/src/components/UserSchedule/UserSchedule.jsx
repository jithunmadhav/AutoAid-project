import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import { useLocation, useNavigate } from 'react-router-dom';

function UserSchedule() {
  const location = useLocation();
  const mech_details = location.state;
  const navigate = useNavigate();
  const [result, setresult] = useState([]);
  const [visible, setVisible] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(mech_details.scheduledDate);

  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
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

    timeSlots.push(dateObj);
  }

  const [findDate, setFindDate] = useState(timeSlots[0].slots);

  const handleDateCardClick = (index, date) => {
    const matchingIndices = [];
    let matchedDate = scheduledDate.find(item => {
        const itemDate = new Date(item.date);
        return itemDate.toISOString().split('T')[0] === date.toISOString().split('T')[0];
      });
      
      if (!matchedDate) {
        setresult([])
    }else{
        setresult(matchedDate.selectedTime)

    }
      
      
    setSelectedTime([]);
    setSelectedTimeSlots([]);
    

    setSelectedDate(date);
    setSelectedCardIndex(index);
  };

  const handleTimeSlotClick = (index, data) => {
    const selectedSlotIndex = selectedTimeSlots[0];  

     
    if (index !== selectedSlotIndex) {
      setSelectedTimeSlots([index]);  
      setSelectedTime([data]);  
    } else {
      setSelectedTimeSlots([]);  
      setSelectedTime([]);  
    }
  };

  const handleSubmit = () => {
    const selecteddate = selectedDate.toISOString();
    navigate('/addvehicle',{state:{...mech_details,booking:'Scheduled booking',selectedDate:selecteddate,selectedTime:selectedTime[0].value}})
  };

 useEffect(() => {
    handleDateCardClick(0, cardData[0].date);

 }, [])

  useEffect(() => {
    console.log(result);
    setFindDate(result);
  }, [result]);

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
                height: '160px',
                border: selectedCardIndex === index ? '4px solid #1df11d' : 'none'
              }}
              onClick={() => handleDateCardClick(index, card.date)}
            >
              <CardActionArea>
                <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'Monomaniac One, sans-serif', textAlign: 'center', fontSize: '35px' }}>
                  {card.title}
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div" style={{ fontFamily: 'Monomaniac One, sans-serif', textAlign: 'center', marginTop: '-17px' }}>
                    {card.value}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
        <div className='cards-mechanics-time'>
          {findDate.length > 0 ? (
            findDate.map((card, index) => (
              <Card
                key={index}
                sx={{ maxWidth: 180 }}
                style={{
                  borderRadius: '15px',
                  width: '280px',
                  height: '70px',
                  backgroundColor: card.backgroundColor,
                  border: selectedTimeSlots.includes(index) ? '4px solid #1df11d' : 'none',
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
            ))
            ) : (
                <Typography variant="h5" component="div"className='no-slot'>
              No slots available
            </Typography>
          )}
          </div>
        <button onClick={() => setVisible(!visible)} className='mechanic-schedule-btn'>continue</button>
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

export default UserSchedule;

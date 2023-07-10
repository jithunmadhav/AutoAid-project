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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

function UserSchedule() {
  const location = useLocation();
  const mech_details = location.state;
  const navigate = useNavigate();
  const [result, setresult] = useState([]);
  const [visible, setVisible] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(mech_details.scheduledDate);
  const notify = (err) => toast(err);
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [err, seterr] = useState('')
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
    const bookedDate = mech_details.booked.find(e => e.currDate === new Date(date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }));


    if(bookedDate){

      const bookedTimeSlot = matchedDate.selectedTime.filter((item) => !bookedDate.selectedTime.some((bookedItem) => bookedItem.value === item.value));
      if (!matchedDate) {
        setresult([])
    }else{
        setresult(bookedTimeSlot)

    }
    }else{
      if (!matchedDate) {
        setresult([])
    }else{
        setresult(matchedDate.selectedTime)

    }
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
    if(selectedTime.length===0){
      notify('Please select time')
    }else{
      const selecteddate = selectedDate.toISOString();
      navigate('/addvehicle',{state:{...mech_details,booking:'Scheduled booking',selectedDate:selecteddate,selectedTime:selectedTime[0].value}})
    }
  };

 useEffect(() => {
    handleDateCardClick(0, cardData[0].date);

 }, [])

  useEffect(() => {
    setFindDate(result);
  }, [result]);
  return (
    <>
      <div className='dashboard-background'>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
        />
        <h5 className='date-heading'>Date :</h5>
        <div className='cards-mechanics'>
          {cardData.map((card, index) => (
            <div className='card-inner'>
            <Card
              key={index}
               
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
          {findDate.length > 0 ? (
            findDate.map((card, index) => (
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
                  <CardContent style={{ padding:'12px' }}>
                    <Typography gutterBottom variant="h5" component="div" className='card-time-font'>
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

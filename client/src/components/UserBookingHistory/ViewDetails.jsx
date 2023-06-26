import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import './ViewDetails.css'
import CompletedHistory from './CompletedHistory';

function ViewDetails(props) {
  const [vehicle, setVehicle] = useState('');
  const [rating, setRating] = useState(0);
  const [openHistory, setopenHistory] = useState(false)
 console.log(rating);
  useEffect(() => {
    axios.get('/user/vehicleDetails', { params: { userId: props.data.userId, vehicleId: props.data.selectedVehicle_id } })
      .then((response) => {
        if (!response.data.err) {
          setVehicle(response.data.result.vehicle[0]);
          console.log(response.data.result.vehicle[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if(rating>0){
        axios.patch('/user/rating',{rating:rating,mechanic_id:props.data.mechanic_id})
    }
  }, [rating])


  return (
    openHistory ? <CompletedHistory/> :
    <div className='viewDetails-background'>
      <div className='viewDetails-inner-div'>
      <button onClick={()=>setopenHistory(true)}  className='viewDetails-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
          </button>
        <div style={{ height: '50px' }}></div>
        <p className='viewDetails-para'>Technician name: {props.data.mechanic_name}</p>
        <p className='viewDetails-para'>Technician Mobile: {props.data.mechanic_mobile}</p>
        <p className='viewDetails-para'>Service Type: {props.data.booking_type}</p>
        <p className='viewDetails-para'>Complaint: {props.data.complaint}</p>
        <p className='viewDetails-para'>Vehicle: {vehicle.manufacture}-{vehicle.vehicleName}</p>
        <p className='viewDetails-para'>Amount: {props.data.amount}</p>
        <p className='viewDetails-para'>Service Date: {new Date(props.data.selectedDate).toLocaleDateString()}</p>
        <h5 className='viewDetails-head'>Add rating</h5>
        <div className="rating-container">
          <Stack spacing={1}>
            <Rating
              name="size-large"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="large"
            />
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default ViewDetails;

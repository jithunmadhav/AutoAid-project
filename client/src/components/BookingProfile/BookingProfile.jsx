import { Button } from '@mui/material';
import React from 'react'
import './BookingProfile.css'
function BookingProfile(props) {
  return (
    <div className='profile-background'>
    <div className='Booking-innder-div'>
      <div className='Booking-inner-div2'>
        <div >
          <div className='Booking-profile-img'>
          <img src= 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680295524~exp=1680296124~hmac=02e23136e23578ef52071ce6ce8be6ecd2a32c6bef946fcacd4e6e788ed33360' style={{objectFit:'cover'}} alt='' width="100"  className="rounded-circle" />
          </div>
          <div>
          <p  className='name'>{props.data.name}</p>
          <p style={{ marginTop:'-17px' }} className='name'>{props.data.experience} + years of experience.</p>

          </div>
        </div>
      </div>
    </div>
      <div className='Booking-maindiv-2'>
        <Button className='quick-btn' variant='outlined' color='error'>QUICK SERVICE</Button>
        <Button className='schedule-btn' variant='outlined'>SCHEDULE SERVICE</Button>
      </div>
  </div>
  )
}

export default BookingProfile

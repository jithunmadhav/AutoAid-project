import { Button } from '@mui/material';
import React from 'react'
import './BookingProfile.css'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
function BookingProfile(props) {
  const firstWord = props.data.location.split(',')[0].trim();
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
          <p style={{ marginTop:'-17px' }} className='name'>{props.data.distance} KM away from you.</p>
          <Stack  spacing={1}>
               <Rating style={{ display:'flex',justifyContent:'center' }} name="size-small" defaultValue={props.data.rating} size="small" readOnly />
           </Stack>

          </div>
        </div>
      </div>
    </div>
      <div className='Booking-maindiv-2'>
      <div className='services'>
  <h5 style={{ textAlign:'left',paddingLeft: '60px' }} >Services</h5>
  <ul style={{ paddingLeft: '100px' }}>
    {
      props.data.service.map((item) => {
        return <li style={{ textAlign: 'left' }}>{item}</li>
      })
    }
  </ul>
  <h5 style={{ textAlign:'left',paddingLeft: '60px' }}>Minimum amount : {props.data.minAmount}
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
          <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z"/></svg>

  </h5>
  <h5 style={{ textAlign:'left',paddingLeft: '60px' }} >Location : {firstWord}</h5>
</div>

        <Button className='quick-btn' variant='outlined' color='error'>QUICK SERVICE</Button>
        <Button className='schedule-btn' variant='outlined'>SCHEDULE SERVICE</Button>
      </div>
  </div>
  )
}

export default BookingProfile

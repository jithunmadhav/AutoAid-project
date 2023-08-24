import { Button } from '@mui/material';
import React, { useState } from 'react'
import './BookingProfile.css'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { useSelector } from 'react-redux';
import ChatPage from '../../Pages/chat/ChatPage';


function BookingProfile(props) {
  const {user} = useSelector(state => state)
  const navigate=useNavigate()
  const [openChat, setopenChat] = useState(false)
  const firstWord = props.data.location.split(' ')[0].trim();
  const [visible, setVisible] = useState(false)
  const [visibleSchedule, setVisibleSchedule] = useState(false)
 const selectVehicle=()=>{
  if(visible){
    navigate('/addvehicle',{state:{...props.data,booking:'Emergency booking'}})
  }else if(visibleSchedule){
    handleOpen()
    setTimeout(() => {
      handleClose()
      navigate('/schedule',{state:{...props.data,booking:'scheduled booking'}})
    }, 1000);
  }
 }
 const [open, setOpen] = React.useState(false);
 const handleClose = () => {
   setOpen(false);
 };
 const handleOpen = () => {
   setOpen(true);
 };
 const createChat=()=>{
  const senderId=user.details._id;
  const receiverId=props.data._id;
  axios.post('/user/chat',{senderId,receiverId}).then((response)=>{
    if(!response.data.err){
      setopenChat(true)
    }
  }).catch(err=>{
    console.log(err);
  })
 }

  return (
    openChat ? <ChatPage data={{...props.data}}/> :
    <div className='profile-background'>
    <div className='Booking-innder-div'>
      <div className='Booking-inner-div2'>
        <div >
          <div className='Booking-profile-img'>
          <img src= 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680295524~exp=1680296124~hmac=02e23136e23578ef52071ce6ce8be6ecd2a32c6bef946fcacd4e6e788ed33360' style={{objectFit:'cover'}} alt='' width="100"  className="rounded-circle Booking-profile-Img" />
          </div>
          <div>
          <p  className='name'>{props.data.name}</p>
          <p style={{ marginTop:'-17px' }} className='name'>{props.data.experience} + years of experience.</p>
          <p style={{ marginTop:'-17px' }} className='name'>{props.data.distance} KM away from you.</p>
          <Stack  spacing={1}>
               <Rating style={{ display:'flex',justifyContent:'center' }} name="size-small" defaultValue={props.data.rating} size="small" readOnly />
           </Stack>
           <Button className='chat-btn' onClick={()=>createChat()} variant='outlined'>Chat with {props.data.name}</Button>
          </div>
        </div>
      </div>
    </div>
      <div className='Booking-maindiv-2'>
      <div className='services-booking'>
  <h5  >Services</h5>
  <ul className='ul-style'>
    {
      props.data.service.map((item) => {
        return <li style={{ textAlign: 'left' }}>{item}</li>
      })
    }
  </ul>
  <h5 >Minimum amount : {props.data.minAmount}
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
          <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z"/></svg>

  </h5>
  <h5  >Location : {firstWord}</h5>
</div>

        <Button  onClick={() => setVisible(!visible)} className='quick-btn' variant='outlined' color='error'>QUICK SERVICE</Button>
        <Button  onClick={() => setVisibleSchedule(!visible)} className='schedule-btn' variant='outlined'>SCHEDULE SERVICE</Button>
      </div>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)} className="custom-modal">
  <CModalHeader style={{ justifyContent: 'center' }} closeButton={false} className="custom-modal-header">
    <CModalTitle>Quick Service Booking</CModalTitle>
  </CModalHeader>
  <CModalBody className="custom-modal-body">
    <p>1. Always do call and confirm after making appointments.</p>
    <p>2. Please fix the service charge before starting the work.</p>
    <p>3. Service charges may vary based on the work.</p>
  </CModalBody>
  <CModalFooter  style={{ justifyContent: 'space-evenly' }} className="custom-modal-footer">
    <CButton color="danger" onClick={() => setVisible(false)}>
      Cancel
    </CButton>
    <CButton onClick={selectVehicle} color="success">
      Continue
    </CButton>
  </CModalFooter>
</CModal>

<CModal alignment="center" visible={visibleSchedule} onClose={() => setVisibleSchedule(false)} className="custom-modal">
  <CModalHeader style={{ justifyContent: 'center' }} closeButton={false} className="custom-modal-header">
    <CModalTitle>Schedule Service Booking</CModalTitle>
  </CModalHeader>
  <CModalBody className="custom-modal-body">
    <p>1. Always do call and confirm after making appointments.</p>
    <p>2. Please fix the service charge before starting the work.</p>
    <p>3. Service charges may vary based on the work.</p>
  </CModalBody>
  <CModalFooter style={{ justifyContent: 'space-evenly' }} className="custom-modal-footer">
    <CButton color="danger" onClick={() => setVisibleSchedule(false)}>
      Cancel
    </CButton>
    <CButton onClick={selectVehicle} color="success">Continue</CButton>
  </CModalFooter>
</CModal>
<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  </div>
  )
}

export default BookingProfile

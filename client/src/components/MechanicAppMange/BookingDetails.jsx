import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import MechanicAppManage from './MechanicAppMange';
import QuickService from './QuickService';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
function BookingDetails(props) {
  const [cancelData, setcancelData] = useState('')
  if(props.data.cancelStatus==='requested'){
    axios.get('/mechanic/cancelrequest',{params:{appointment_id:props.data._id}}).then((response)=>{
      if(!response.data.err){
        setcancelData(response.data.result)
      }
    })
  }
    const [showSchedule, setshowSchedule] = useState(false)
    const [showEmergency, setshowEmergency] = useState(false)
    const [details, setdetails] = useState(props.data)
    const [result, setresult] = useState('')
    const [user, setuser] = useState('')
    const [status, setstatus] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    const handleChange = (event) => {
    setstatus(event.target.value);
    };
    const vehicleId=details.selectedVehicle_id;
    const userId=details.userId;
    useEffect(() => {
        axios.get('/user/vehicleDetails', { params: { vehicleId, userId } }).then((response) => {
            setresult(response.data.result.vehicle[0])
        })
        axios.get(`/mechanic/customerDetails/${userId}`).then((response)=>{
            setuser(response.data.result)
        })
        },)
        
        const statusupdate=()=>{
          const id=details._id;
           if(status.trim()){
          axios.patch('/mechanic/updatestatus',{status,id}).then((response)=>{
              if(!response.data.err){
                  handleOpen()
                  setTimeout(() => {
                      handleClose()
                      details.type? setshowSchedule(true):setshowEmergency(true);
                  }, 1500);
              }
          })
        }
        }
        const cancelBooking=()=>{
          if(status.trim()){
            axios.post('/mechanic/cancelbooking',{...cancelData,status}).then((response)=>{
                if(!response.data.err){
                    handleOpen()
                    setTimeout(() => {
                        handleClose()
                        details.type? setshowSchedule(true):setshowEmergency(true);
                    }, 1500);
                }
            })
          }
        }
     

  return (
    showSchedule? <MechanicAppManage/>:
    showEmergency ?<QuickService/>:
    <div className='bookingdetials-background'>
    <div className='bookingdetials-inner-div'>
        <div className='bookingdetials-inner-left'>
            {details.type?
        <button onClick={()=>setshowSchedule(true)}  className='vehicle-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
          </button>:
          <button onClick={()=>setshowEmergency(true)}  className='vehicle-btn'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
        </button>
          }
      <h4 className='bookingdetials-heading'>Vehicle Details :</h4>
      <p className='bookingdetials-para'>Manufacture : {result.manufacture}</p>
      <p className='bookingdetials-para'>VehicleName : {result.vehicleName}</p>
      <p className='bookingdetials-para'>Kilometer : {result.kilometer}</p>
      <p className='bookingdetials-para'>Manufacture Year : {result.manufactureYear}</p>
      <h4 className='bookingdetials-heading'>Customer Details :</h4>
      <p className='bookingdetials-para'>Name : {user.name}</p>
      <p className='bookingdetials-para'>Number : {user.mobile}</p>
      <p className='bookingdetials-para'>Location : {details.userLocation}</p>
      <p className='bookingdetials-para'>Compliant : {details.complaint}</p>
      {details.type ? 
   <> <p className='bookingdetials-para'>Scheduled date : {new Date(details.selectedDate).toLocaleDateString()}</p>
   <p className='bookingdetials-para'>Scheduled time : {details.selectedTime}</p> </> :''
    }
        </div>
          {props.data.cancelStatus==='requested'? 
             <div className='bookingdetials-inner-right'>
             <h4 className='bookingdetials-heading' style={{ textAlign:'left' }}>Booking cancel request :</h4><br/>
             <p>Reason : {cancelData.reason}</p>
             <div style={{ display:'flex' }}>
             <>
             <FormControl  sx={{ m: 1, minWidth: 200 }} size="small">
           <InputLabel  id="demo-select-small-label">select</InputLabel>
           <Select 
             labelId="demo-select-small-label"
             id="demo-select-small"
             value={status}
             label="Age"
             onChange={handleChange}
           >
             
             <MenuItem value={'approve'}>Approve</MenuItem>
             <MenuItem value={'reject'}>Reject</MenuItem>
           </Select>
         </FormControl>
         <Button  onClick={()=>cancelBooking()}  className='status-save-button' variant='outlined' color='secondary'>Save</Button>
         </>
         </div>
             </div>
        :
        <div className='bookingdetials-inner-right'>
        <h4 className='bookingdetials-heading' style={{ textAlign:'left' }}>Status updation :</h4>
        <div style={{ display:'flex' }}>
        <>
        <FormControl  sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel  id="demo-select-small-label">status</InputLabel>
      <Select 
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={status}
        label="Age"
        onChange={handleChange}
      >
        
        <MenuItem value={'confirmed'}>confirm</MenuItem>
        <MenuItem value={'work progressing'}>work progressing</MenuItem>
        <MenuItem value={'completed'}>completed</MenuItem>
      </Select>
    </FormControl>
    <Button onClick={()=>statusupdate()} className='status-save-button' variant='outlined' color='secondary'>Save</Button>
    </>
    </div>
        </div>
  }

    </div>
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

export default BookingDetails

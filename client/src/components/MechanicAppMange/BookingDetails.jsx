import axios from '../../axios';
import React, { useEffect, useState } from 'react'

function BookingDetails(props) {
    const [details, setdetails] = useState(props.data)
    const [result, setresult] = useState('')
    const [user, setuser] = useState('')
    console.log(props.data);
    const vehicleId=details.selectedVehicle_id;
    const userId=details.userId;
    useEffect(() => {
        axios.get('/user/vehicleDetails', { params: { vehicleId, userId } }).then((response) => {
            setresult(response.data.result.vehicle[0])
        })
        axios.get(`/mechanic/customerDetails/${userId}`).then((response)=>{
            setuser(response.data.result)
        })
        },[userId])
  return (
    <div className='bookingdetials-background'>
    <div className='bookingdetials-inner-div'>
        <div className='bookingdetials-inner-left'>
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
        <div className='bookingdetials-inner-right'>
     

        </div>

    </div>
  </div>
  )
}

export default BookingDetails

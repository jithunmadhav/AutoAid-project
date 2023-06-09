import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import './ComplaintForm.css'
import { useSelector } from 'react-redux';

function ComplaintForm(props) {
  const {user} = useSelector(state => state)
  const vehicleId=props.data.selectedVehicle;
  const userId=user.details._id;
  const [vehicleDetails, setvehicleDetails] = useState('')
  useEffect(() => {
   axios.get('/user/vehicleDetails',{params:{vehicleId,userId}}).then((response)=>{
    if(!response.data.err){
      console.log("******",response.data);
      setvehicleDetails(response.data.result)
    }
   }).catch(err => console.log(err))
  }, [userId,vehicleId])
  const [manufacture, setmanufacture] = useState(vehicleDetails.vehicle.manufacture)
  return (
    <div className='complaint-bg'>
      <div className='complaint-inner-div'>
      <h3 className='Complaint-heading'>Complaint Form</h3>
        <form style={{ display:'flex' }} >
      <div style={{ display:'flex' }}>
        <div className='form-div1'>
          <input className='input-field' value={manufacture} type="text" readOnly />
          <input className='input-field' type="text" readOnly />
          <input className='input-field' type="text" readOnly/>
          <input className='input-field' type="text" />
        </div>
        <div className='form-div2'>
        <input className='input-field' type="text" readOnly />
          <input className='input-field' type="text" readOnly />
          <input className='input-field' type="text" readOnly />
          <input className='input-field' type="text" readOnly />
        </div>
      </div>
        <button className='btn'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ComplaintForm

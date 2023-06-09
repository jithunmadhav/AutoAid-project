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
      setvehicleDetails(response.data.result.vehicle[0])
    }
  }).catch(err => console.log(err))
}, [userId,vehicleId])
 
  return (
    <div className='complaint-bg'>
      <div className='complaint-inner-div'>
      <h3 className='Complaint-heading'>Complaint Form</h3>
        <form style={{ display:'flex' }} >
      <div style={{ display:'flex' }}>
        <div className='form-div1'>
          <input className='input-field' value={vehicleDetails?.manufacture || ''}  type="text" readOnly />
          <input className='input-field' value={vehicleDetails?.regNo || ''} type="text" readOnly />
          <input className='input-field' value={vehicleDetails?.fuel || ''} type="text" readOnly/>
          <input className='input-field' type="text" />
        </div>
        <div className='form-div2'>
        <input className='input-field' value={vehicleDetails?.vehicleName || ''} type="text" readOnly />
          <input className='input-field' value={vehicleDetails?.kilometer || ''} type="text" readOnly />
          <input className='input-field' value={vehicleDetails?.manufactureYear || ''} type="text" readOnly />
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

import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import './AddVehicle.css'
import AddVehicleForm from './AddVehicleForm'
import { useSelector } from 'react-redux'
function AddVehicle() {
  const {user} = useSelector(state => state)
  const id=user.details._id
  const [vehicleResult, setvehicleResult] = useState([])
    const [openform, setopenform] = useState(false)
    const openForm=()=>{
        setopenform(true)
    }
    useEffect(() => {
     axios.get(`/user/allvehicle/${id}`).then((response)=>{
      if(!response.data.err){
        setvehicleResult(response.data.result)
      }
     })
    }, [vehicleResult,id])
  return (
    openform ? <AddVehicleForm/> :
    <div className='vehicle-background'>
      <div className='vehicle-inner-div'>

        <h4 className='vehicle-heading'>My Vehicle</h4>
        <button onClick={()=>openForm()} className='vehicle-btn' >+</button>
        {}
        <div className='vehicle-table'></div>

      </div>
    </div>
    
  )
}

export default AddVehicle

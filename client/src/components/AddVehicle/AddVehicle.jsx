import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import './AddVehicle.css'
import AddVehicleForm from './AddVehicleForm'
function AddVehicle() {
    const [openform, setopenform] = useState(false)
    const openForm=()=>{
        setopenform(true)
    }
    useEffect(() => {
     axios
    }, [])
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

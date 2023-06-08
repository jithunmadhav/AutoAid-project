import React, { useState } from 'react'
import './AddVehicle.css'
import AddVehicleForm from './AddVehicleForm'
function AddVehicle() {
    const [openform, setopenform] = useState(false)
    const openForm=()=>{
        setopenform(true)
    }
  return (
    openform ? <AddVehicleForm/> :
    <div className='vehicle-background'>
      <div className='vehicle-inner-div'>

        <h4 className='heading'>My Vehicle</h4>
        <button onClick={()=>openForm()} className='vehicle-btn' >+</button>
      </div>
    </div>
    
  )
}

export default AddVehicle

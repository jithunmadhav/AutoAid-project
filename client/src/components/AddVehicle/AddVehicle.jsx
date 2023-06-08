import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import './AddVehicle.css'
import AddVehicleForm from './AddVehicleForm'
import { useSelector } from 'react-redux'
function AddVehicle() {
  const {user} = useSelector(state => state)
  const id=user.details._id
  const [vehicleResult, setvehicleResult] = useState([])
  useEffect(() => {
    axios.get(`/user/allvehicle/${id}`).then((response)=>{
      if(!response.data.err){
        setvehicleResult(response.data.result[0].vehicle)
      }
    })
  },[id])
  
  console.log(vehicleResult);
    const [openform, setopenform] = useState(false)
    const openForm=()=>{
        setopenform(true)
    }
    
  return (
    openform ? <AddVehicleForm/> :
    <div className='vehicle-background'>
      <div className='vehicle-inner-div'>

        <h4 className='vehicle-heading'>My Vehicle</h4>
        <button onClick={()=>openForm()} className='vehicle-btn' >+</button>
        {
          vehicleResult.map((item)=>{
            return  ( <div className='vehicle-table'>
              <div style={{width:'50%',height:'100px', textAlign:'left' ,paddingLeft:'60px'}}>
                <p style={{ marginBottom:'0px' }}>{item.vehicleName}</p>
                <p style={{ marginBottom:'0px' }}>{item.regNo}</p>
                <p style={{ marginBottom:'0px' }}>{item.manufactureYear}</p>
              </div>
              <div style={{width:'50%',height:'100px' , textAlign:'right' ,paddingRight:'150px'}}>
                <p style={{ marginBottom:'0px' }}>{item.kilometer} KM</p>
                <p style={{ marginBottom:'0px' }}>{item.fuel}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fuel-pump-fill" viewBox="0 0 16 16">
                <path d="M1 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1 2 2v.5a.5.5 0 0 0 1 0V8h-.5a.5.5 0 0 1-.5-.5V4.375a.5.5 0 0 1 .5-.5h1.495c-.011-.476-.053-.894-.201-1.222a.97.97 0 0 0-.394-.458c-.184-.11-.464-.195-.9-.195a.5.5 0 0 1 0-1c.564 0 1.034.11 1.412.336.383.228.634.551.794.907.295.655.294 1.465.294 2.081V7.5a.5.5 0 0 1-.5.5H15v4.5a1.5 1.5 0 0 1-3 0V12a1 1 0 0 0-1-1v4h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V2Zm2.5 0a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5Z"/>
                </svg>
                </p>
                <p style={{ marginBottom:'0px' }}>{item.manufacture}</p>
              </div>
            </div>)

          })
        }

      </div>
    </div>
    
  )
}

export default AddVehicle

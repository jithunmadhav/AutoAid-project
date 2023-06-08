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
              <div style={{width:'50%',height:'100px', textAlign:'left' ,paddingLeft:'20px',marginBottom:'0px'}}>
                <p style={{ marginBottom:'0px' }}>{item.vehicleName}</p>
                <p style={{ marginBottom:'0px' }}>{item.regNo}</p>
                <p style={{ marginBottom:'0px' }}>{item.regNo}</p>
              </div>
              <div style={{width:'50%',height:'100px'}}>

              </div>
            </div>)

          })
        }

      </div>
    </div>
    
  )
}

export default AddVehicle

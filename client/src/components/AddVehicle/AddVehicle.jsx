import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import './AddVehicle.css'
import AddVehicleForm from './AddVehicleForm'
import { useDispatch, useSelector } from 'react-redux'

function AddVehicle() {
  const { user } = useSelector(state => state)
  const id = user.details._id
  const [vehicleResult, setVehicleResult] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get(`/user/allvehicle/${id}`).then((response) => {
      if (!response.data.err) {
        setVehicleResult(response.data.result[0].vehicle)
      }
    })
  }, [id])

  console.log(vehicleResult)

  const [openForm, setOpenForm] = useState(false)
  const openFormHandler = () => {
    setOpenForm(true)
  }
  const editVehicle=(id)=>{

  }
  const deleteVehicle=(vehicleId,userId)=>{
   axios.delete('/user/deletevehicle',{vehicleId,userId}).then((response)=>{
    dispatch({type:'refresh'})
   }).catch(err=>{
    console.log(err);
   })

  }
  

  return (
    openForm ? <AddVehicleForm /> :
    <div className='vehicle-background'>
      <div className='vehicle-inner-div'>
        <h4 className='vehicle-heading'>My Vehicle</h4>
        <button onClick={openFormHandler} className='vehicle-btn'>+</button>
        {
          vehicleResult.length === 0 ?
          <h4>No Vehicle Added</h4> :
          vehicleResult.map((item) => {
            return (
              <div className='vehicle-table'>
                <div style={{ width: '50%', height: '100px', textAlign: 'left', paddingLeft: '60px' }}>
                  <p style={{ marginBottom: '0px' }}>{item.vehicleName}</p>
                  <p style={{ marginBottom: '0px' }}>{item.regNo}</p>
                  <p style={{ marginBottom: '0px' }}>{item.manufactureYear}</p>
                </div>
                <div style={{ width: '40%', height: '100px', textAlign: 'right', paddingRight: '80px' }}>
                  <p style={{ marginBottom: '0px' }}>{item.kilometer} KM</p>
                  <p style={{ marginBottom: '0px' }}>
                    {item.fuel}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-fuel-pump-fill" viewBox="0 0 16 16">
                      <path d="M1 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1 2 2v.5a.5.5 0 0 0 1 0V8h-.5a.5.5 0 0 1-.5-.5V4.375a.5.5 0 0 1 .5-.5h1.495c-.011-.476-.053-.894-.201-1.222a.97.97 0 0 0-.394-.458c-.184-.11-.464-.195-.9-.195a.5.5 0 0 1 0-1c.564 0 1.034.11 1.412.336.383.228.634.551.794.907.295.655.294 1.465.294 2.081V7.5a.5.5 0 0 1-.5.5H15v4.5a1.5 1.5 0 0 1-3 0V12a1 1 0 0 0-1-1v4h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V2Zm2.5 0a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5Z" />
                    </svg>
                  </p>
                  <p style={{ marginBottom: '0px' }}>{item.manufacture}</p>
                </div>
                <div style={{ width: '10%', height: '100px' }}>
                  <div style={{ paddingTop:'30px' }} >
                    <button onClick={()=>editVehicle(item._id)} style={{ marginRight:'20px' }}>
                      
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                      </svg>
                    </button>
                    <button onClick={()=>deleteVehicle(item._id,id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                    </button>
                  </div>

                </div>
              </div>)

            })
          }

        </div>
      </div>

    )
  }

  export default AddVehicle

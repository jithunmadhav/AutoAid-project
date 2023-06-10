import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import './ComplaintForm.css'
import { useSelector } from 'react-redux';
import Axios from 'axios';
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
function ComplaintForm(props) {
  console.log(props);
  const { user } = useSelector(state => state);
  const [visible, setVisible] = useState(false)
  const [complaint, setcomplaint] = useState('')
  const vehicleId = props.data.selectedVehicle;
  const userId = user.details._id;
  const [vehicleDetails, setVehicleDetails] = useState('');
const [location, setlocation] = useState('')
  useEffect(() => {
    axios.get('/user/vehicleDetails', { params: { vehicleId, userId } })
      .then((response) => {
        if (!response.data.err) {
          setVehicleDetails(response.data.result.vehicle[0]);
        }
        navigator.geolocation.getCurrentPosition((position)=>{
          console.log(position);
          const accessToken = 'pk.eyJ1Ijoiaml0aHVuIiwiYSI6ImNsaWEzZjg1NzBuMngzZHBnOWZzeTJ3eDMifQ.QUWNrEcjjYw_-HbBUDquhw';
       const latitude = position.coords.latitude;
       const longitude = position.coords.longitude;

fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`)
  .then(response => response.json())
  .then(data => {
    // Extract the place information from the response
    const placeName = data.features[0].text;
    setlocation(placeName)
  })
  .catch(error => {
    console.error('Error:', error);
  });

        })
      })
      .catch(err => console.log(err));

    Axios.get('https://ipapi.co/json')
      .then((response) => {
        console.log(response);
      });
  }, [userId, vehicleId]);

  const handleSubmit=(e)=>{
    e.preventDefault()
    setVisible(true)
    console.log(props,location,complaint);
  }
const placeOrder=()=>{
  axios.post('/user/emergencybooking',{props,location,complaint}).then((response)=>{
    console.log(response.data);
    setVisible(false)
  })
}
  return (
    <div className='complaint-bg'>
      <div className='complaint-inner-div'>
        <h3 className='Complaint-heading'>Complaint Form</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
          <div style={{ display: 'flex' }}>
            <div className='form-div1'>
              <label>Manufacturer:</label>
              <input className='input-field' value={vehicleDetails?.manufacture || ''}  type="text" readOnly />
              <label>Registration Number:</label>
              <input className='input-field' value={vehicleDetails?.regNo || ''} type="text" readOnly />
              <label>Fuel:</label>
              <input className='input-field' value={vehicleDetails?.fuel || ''} type="text" readOnly />
              <label>Location:</label>
              <textarea style={{ height:'96px' }} className='input-field' value={location} type="text"  readOnly/>
            </div>
            <div className='form-div2'>
              <label>Vehicle Name:</label>
              <input className='input-field' value={vehicleDetails?.vehicleName || ''} type="text" readOnly />
              <label>Kilometer:</label>
              <input className='input-field' value={vehicleDetails?.kilometer + ' KM' || ''} type="text" readOnly />
              <label>Manufacture Year:</label>
              <input className='input-field' value={vehicleDetails?.manufactureYear || ''} type="text" readOnly />
              <label>Complaint Description:</label>
              <textarea style={{ height:'96px' }} value={complaint} onChange={(e)=>setcomplaint(e.target.value)} className='input-field' type="text" placeholder='Eg : 5000KM oil change' />
            </div>
          </div>
          <button  className='complaint-btn'>Submit</button>
        </form>
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)} className="custom-modal">
  <CModalHeader style={{ justifyContent: 'center' }} closeButton={false} className="custom-modal-header">
    <CModalTitle>Confirmation</CModalTitle>
  </CModalHeader>
  <CModalBody   className="custom-modal-body">
    <p>Technician Info &emsp; : {props.data.mechanic.name}</p>
    <p>vehicle  &emsp; &emsp; &emsp; &emsp;     : {vehicleDetails.vehicleName} - {vehicleDetails.manufacture}</p>
    <p>Service Info&emsp;&nbsp; &emsp;    : {props.data.mechanic.selectedService}</p>
    <p>Booking Type&nbsp; &emsp;   : {props.data.mechanic.booking}</p>
  </CModalBody>
  <CModalFooter  style={{ justifyContent: 'space-evenly' }} className="custom-modal-footer">
    <CButton color="danger" onClick={() => setVisible(false)}>
      Cancel
    </CButton>
    <CButton onClick={placeOrder}  color="primary">
      Confirm
    </CButton>
  </CModalFooter>
</CModal>
      </div>
    </div>
  )
}

export default ComplaintForm;

import React from 'react'
import './AppointmentSuccess.css'
import { Link } from 'react-router-dom'
function AppointmentSuccess() {
  return (
    <>
      <div>
        <h1 className='success-header'>BOOKING SUCCESS</h1>
        <p className='first-para'>Your Service Request has been submitted.please do call and confirm.</p>
      </div>
      <div >
        <img className='success-img' src="http://www.clipartbest.com/cliparts/niX/8Mp/niX8MpbGT.png" alt="success logo" />
      </div>
      <p className='second-para'>We will notify you when technician accepts your request</p>
      <Link to={'/'}><button className='coninue-button'>Contine</button></Link>
    </>
  )
}

export default AppointmentSuccess

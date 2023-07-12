import React, { useEffect, useState } from 'react';
import './AppointmentSuccess.css';
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function AppointmentSuccess() {
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowBackdrop(false);
      setShowSuccessPage(true);
    }, 1500);
  }, []);

  return (
    <>
      {showBackdrop && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      
      {showSuccessPage && (
        <>
          <div>
            <h1 className='success-header'>BOOKING SUCCESS</h1>
            <p className='first-para'>Your Service Request has been submitted. Please call and confirm.</p>
          </div>
          <div>
            <img className='success-img' src="https://clipart-library.com/images/Lcd5doyqi.png" alt="success logo" />
          </div>
          <p className='second-para'>We will notify you when the technician accepts your request.</p>
          <Link to={'/booking'}>
            <button className='coninue-button '>Continue</button></Link>
        </>
      )}
    </>
  );
}

export default AppointmentSuccess;

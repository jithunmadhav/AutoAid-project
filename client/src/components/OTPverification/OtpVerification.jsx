import React, { useState, useEffect } from 'react';
import './OtpVerification.css';
import OTPInput from 'otp-input-react';
import axios from '../../axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function OtpVerification(props) {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const [OTP, setOTP] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendAttempts, setResendAttempts] = useState(0);

  useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

 const handleSubmit=(e)=>{
  e.preventDefault()
  axios.post('/user/verifySignup',{OTP,...props}).then((response)=>{
    if(!response.data.err){
      dispatch({type:'refresh'})
      navigate('/')
    }else{
      console.log(response.data.message);
    }
  })

 }

  const handleResendOTP = () => {

    if (resendAttempts < 3) {
      setResendAttempts((prevAttempts) => prevAttempts + 1);
      setTimer(60);
      axios.post('/user/resendOtp',{...props}).then((response)=>{
        console.log(response.data);
      })
      // Perform resend OTP logic here
    } 
  };

  return (
    <div>
      <div className="gray-background">
        <div className="signup">
          <div className="signup-connect-otp"></div>
          <div className="signup-classic">
            <form className="form" onSubmit={handleSubmit}>
              <p className="paraStyle">Please enter the OTP.</p>
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={5}
                otpType="number"
                disabled={false}
                secure
                className="textfield"
              />
              <button
                type="submit"
                style={{
                  color: 'white',
                  height: '53px',
                  paddingTop: '8px',
                  marginTop: '33px',
                }}
                className="btn"
              >
                Continue
              </button>
              {timer === 0 && resendAttempts < 3 && (
                <button
                  type="submit"
                  className="resend-btn"
                  style={{ color:'white' }} 
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </button>
              )}
              {timer > 0 && (
                <p className="timer timer-style">Resend OTP in {timer} s</p>
              )}
              {resendAttempts >= 3 && (
                <p className="error-msg">Maximum resend attempts reached</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;

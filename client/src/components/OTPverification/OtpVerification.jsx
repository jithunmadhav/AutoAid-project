import React, { useState, useEffect } from 'react';
import './OtpVerification.css';
import OTPInput from 'otp-input-react';
import axios from '../../axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ResetPassword from '../ResetPassword/ResetPassword';

function OtpVerification(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [OTP, setOTP] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [showReset, setshowReset] = useState(false)
  const [err, seterr] = useState('')
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(props.data.reset);
    if (props.data.reset==='forgotpassword') {
      axios.post('/user/verifyResetOtp', { OTP }).then((response) => {
        if (!response.data.err) {
          setshowReset(true)
        } else {
          seterr(response.data.message)
        }
      });
    } else if(props.data.reset==='signup') {
      axios.post('/user/verifySignup', { OTP, ...props.data }).then((response) => {
        if (!response.data.err) {
          dispatch({ type: 'refresh' });
          navigate('/');
        } else {
          seterr(response.data.message)
        }
      });
    }else if(props.data.reset==='mechanicsignup'){
      axios.post('/mechanic/verifySignup', { OTP, ...props.data },{headers: {
        'content-type': 'multipart/form-data'
    }}).then((response) => {
        if (!response.data.err) {
          dispatch({ type: 'refresh' });
          navigate('/mechanic/login');
        } else {
          seterr(response.data.message)
        }
      });
    }else if(props.data.reset==='forgotmechanic'){
      axios.post('/mechanic/mechVerifyReset', { OTP }).then((response) => {
        if (!response.data.err) {
          setshowReset(true)
        } else {
          seterr(response.data.message)
        }
      });
    }
  };

  const handleResendOTP = () => {
    if (resendAttempts < 3) {
      setResendAttempts((prevAttempts) => prevAttempts + 1);
      setTimer(60);
      axios.post('/user/resendOtp', { ...props.data }).then((response) => {
        console.log(response.data);
      });
    }
  };

  return (
    !showReset ?
    <div>
      <div className="gray-background">
        <div className="signup">
          <div className="signup-connect-otp"></div>
          <div className="signup-classic">
          <p className='errorMessage'>{err}</p>
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
                  style={{ color: 'white' }}
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
    :<ResetPassword data={{...props.data}}/>

  );
}

export default OtpVerification;

import React ,{useState} from 'react';
import './OtpVerification.css';
import OTPInput from "otp-input-react";

function OtpVerification() {
    const [OTP, setOTP] = useState("");

  return (
    <div>
      <div className="gray-background">
        <div className="signup">
          <div className="signup-connect-otp"></div>
          <div className="signup-classic">
            {/* <p className='errorMessage'>{err}</p> */}
            <form className="form">
              <p className='paraStyle'>Please enter the OTP.</p>
            <OTPInput
              value={OTP}
               onChange={setOTP}
               autoFocus
               OTPLength={5}
               otpType="number"
               disabled={false}
               secure
              className='textfield'
              />
              <button type="submit" style={{ color: 'white' ,
              height: '53px',
              paddingTop: '8px',
              marginTop: '69px' }} className="btn">
                continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;

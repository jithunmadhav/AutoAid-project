import React, { useState } from 'react'
import './ForgotPassword.css'
import axios from '../../axios'
import OtpVerification from '../OTPverification/OtpVerification'

function ForgotPassword() {
    const [Otp, SetOtp] = useState(false)
    const [email, setemail] = useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("hello");
        axios.post('/user/forgotPassword',{email}).then((response)=>{
            if(!response.data.errr){
                SetOtp(true)
            }
        })

    }
  return (
    !Otp?  <div className='forgot-bg'>
    <div className='inner-Div'>
    <div className="signup-connect-forgot"></div>
        <div className="signup-classic">
        <p className="paraStyle-forgot">Please enter your email.</p>
          <form onSubmit={handleSubmit} className="form">
            <fieldset className="email">
              <input
                type="email"
                placeholder="email"
                 value={email}
                 onChange={(e)=>setemail(e.target.value)}
                required
              />
            </fieldset>
            
            <button type="submit" style={{ color: 'white' }} className="btn">
              continue
            </button>
          </form>
         
        </div>
    </div>
  </div>
:<OtpVerification data={{email,reset:'reset'}}/>
   
  )
}

export default ForgotPassword

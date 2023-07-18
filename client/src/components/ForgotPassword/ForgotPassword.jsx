import React, { useState } from 'react'
import './ForgotPassword.css'
import axios from '../../axios'
import OtpVerification from '../OTPverification/OtpVerification'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
    const [Otp, SetOtp] = useState(false)
    const [email, setemail] = useState('')
    const [err, seterr] = useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("hello");
        axios.post('/user/forgotPassword',{email}).then((response)=>{
            if(!response.data.err){
                SetOtp(true)
            }else{
              seterr(response.data.message)
            }
        }).catch((error)=>{
          console.log(error);
         dispatch({type:'refresh'})
         navigate('/error')
        })

    }
  return (
    !Otp?  <div className='forgot-bg'>
    <div className='inner-Div'>
    <div className="signup-connect-forgot"></div>
        <div className="signup-classic">
        <p className='errorMessage'>{err}</p>
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
:<OtpVerification data={{email,reset:'forgotpassword',mechReset:false}}/>
   
  )
}

export default ForgotPassword

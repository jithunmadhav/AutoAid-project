import axios from '../../axios'
import React, { useState } from 'react'
import './UserSignup.css'
import OtpVerification from '../OTPverification/OtpVerification'
import {useDispatch } from 'react-redux'

function UserSignup() {
  const dispatch = useDispatch()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [mobile, setmobile] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [err, seterr] = useState('')
  const [showOtpPage,setShowOtpPage]=useState(false)

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(name.trim() && email.trim() && mobile.trim() && password.trim() && confirmpassword.trim() ){
      if(password===confirmpassword){
        console.log(mobile.length);
        if(mobile.length===10){
          axios.post('/user/signup',{name,email,mobile,password,confirmpassword}).then((response)=>{
            console.log(response.data);
            if(!response.data.err){
              dispatch({type:'refresh'})
              setShowOtpPage(true)
            }else{
              seterr(response.data.message)
            }
          })
        }else{
          seterr('Enter valid mobile number')
        }
      }else{
        seterr('Password are not same')
      }
    }else{
      seterr('All fields are required')
    }
  }
  return (
    !showOtpPage?
    <div className='signup-background'>
       <div className='Signup-user'>
  <div className='Signup-connect'>
  </div>
  <div className='Signup-classic'>
  <p className='errorMessage'>{err}</p>
    <form className='Form' onSubmit={handleSubmit}>
      <fieldset className='username'>
        <input type="text" placeholder="username" value={name} onChange={(e)=>setname(e.target.value)} required/>
      </fieldset>
      <fieldset className='email'>
        <input type="email" placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)} required/>
      </fieldset>
      <fieldset className='password'>
        <input type="text" placeholder="Mobile" value={mobile} onChange={(e)=>setmobile(e.target.value)}  required/>
      </fieldset>
      <fieldset className='password'>
        <input type="password" placeholder="password"  value={password} onChange={(e)=>setpassword(e.target.value)} required/>
      </fieldset>
      <fieldset className='password'>
        <input type="password" placeholder="confirm password" value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)}  required/>
      </fieldset>
      <button type="submit" style={{ color:'white' }}  className="btn">sign up</button>
      
    </form>

  </div>
</div>
    </div>
    :<OtpVerification data={{name,email,mobile,password,reset:'signup'}}/>
    
  )
}

export default UserSignup

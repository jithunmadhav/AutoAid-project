import React, { useState } from 'react'
import './MechanicSignup.css'
import axios from '../../axios'
import MecahnicSignup2 from './MecahnicSignup2'
function MechanicSignup() {
  const [name, setName] = useState('')
  const [email, setemail] = useState('')
  const [mobile, setmobile] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [err, seterr] = useState('')
  const [showSignup2, setshowSignup2] = useState(false)
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(name.trim() && email.trim()&&mobile.trim()&&password.trim()&&confirmPassword.trim){
      if(password===confirmPassword){
        axios.post('/mechanic/signup',{email,password,confirmPassword,mobile}).then((response)=>{
          if(!response.data.err){
            console.log(response.data);
            setshowSignup2(true)
          }
        })
      }else{
        seterr('Password are not same')
      }
    }else{
      seterr("All fields are required")
    }
  }

  return (
    !showSignup2 ?
    <div>
      <div className='signup-background'>
       <div className='Signup'>
  <div className='Signup-connect-mechanic '>
  </div>
  <div className='Signup-classic'>
  <p className="errorMessage">{err}</p>
    <form  onSubmit={handleSubmit} className='Form'>
      <fieldset className='username'>
        <input type="text" value={name} onChange={(e=>setName(e.target.value))} placeholder="username" required/>
      </fieldset>
      <fieldset className='email'>
        <input type="email"  value={email} onChange={(e=>setemail(e.target.value))} placeholder="email" required/>
      </fieldset>
      <fieldset className='password'>
        <input type="text"  value={mobile} onChange={(e=>setmobile(e.target.value))} placeholder="Mobile"  required/>
      </fieldset>
   
      <fieldset className='password'>
        <input type="password"  value={password} onChange={(e=>setpassword(e.target.value))} placeholder="password"  required/>
      </fieldset>
      <fieldset className='password'>
        <input type="password"  value={confirmPassword} onChange={(e=>setconfirmPassword(e.target.value))} placeholder="confirm password"  required/>
      </fieldset>
      <button type="submit" style={{ color:'white' }}  className="btn">Next</button>
    </form>
  </div>
</div>
    </div>
    </div>
    :<MecahnicSignup2 data={{name,email,mobile,password,confirmPassword}}/>
  )
}

export default MechanicSignup

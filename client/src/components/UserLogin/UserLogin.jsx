import React, { useState } from 'react'
import './UserLogin.css'
import { Link } from 'react-router-dom'
import axios from '../../axios'
function UserLogin() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [err, seterr] = useState('')
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(email.trim() && password.trim()){
      axios.post('/user/login',{email,password}).then((response)=>{
        console.log(response.data);
      })
    }else{
      seterr('All fields are required')
    }
  }
  return (
    <div >
        <div className="gray-background ">
       <div className='signup'>
  <div className='signup-connect'>
   
  </div>
  <div className='signup-classic'>
  <p className='errorMessage'>{err}</p>
    <form onSubmit={handleSubmit} className='form'>
      <fieldset className='email'>
        <input type="email" placeholder="email"  value={email} onChange={(e)=>setemail(e.target.value)}  required/>
      </fieldset>
      <fieldset className='password'>
        <input type="password" placeholder="password" value={password} onChange={(e)=>setpassword(e.target.value)}   required/>
      </fieldset>
      <button type="submit" className="btn">Login</button>
    </form>
    <Link style={{textDecoration:'none',display:'flex' ,justifyContent:'center'}} to='/user/signup' >signup</Link>
  </div>
</div></div>
    </div>
  )
}

export default UserLogin

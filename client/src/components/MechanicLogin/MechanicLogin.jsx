import React, { useState } from 'react'
import './MechanicLogin.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../axios'
import { useDispatch } from 'react-redux'

function MechanicLogin() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [err, seterr] = useState('')
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(email.trim() && password.trim()){
      axios.post('/mechanic/login',{email,password}).then((response)=>{
        if(!response.data.err){
          dispatch({type:'refresh'})
          navigate('/mechanic/dashboard')
        }
      })
    }else{
      seterr('All fields are required')
    }
  }
  return (
    <>
        <div className="gray-background ">
       <div className='signup'>
  <div className='signup-connect-mechanicLogin'>
   
  </div>
  <div className='signup-classic'>
  <p className='errorMessage'>{err}</p>
    <form onSubmit={handleSubmit} className='form'>
      <fieldset className='email'>
        <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="email"   required/>
      </fieldset>
      <fieldset className='password'>
        <input type="password" placeholder="password"  value={password} onChange={(e)=>setpassword(e.target.value)}  required/>
      </fieldset>
      <button type="submit" style={{ color:'white' }}  className="btn">Login</button>
    </form>
    <Link style={{textDecoration:'none',display:'flex' ,justifyContent:'center'}} to='/mechanic/signup' >signup</Link>
    <Link style={{textDecoration:'none',display:'flex' ,justifyContent:'center'}} to='/forgotMechanicPassword' >forgot password</Link>
  </div>
</div></div>
    </>
  )
}

export default MechanicLogin

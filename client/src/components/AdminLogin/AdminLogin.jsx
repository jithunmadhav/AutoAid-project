import React, { useState } from 'react'
import  './AdminLogin.css'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'
function AdminLogin() {
  const navigate= useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(email.trim() && password.trim()){
      axios.post('/admin/login',{email,password}).then((response)=>{
        console.log(response.data);
        if(!response.data.err){
        return navigate('/admin/dashboard')
        }else{
          setErr(response.data.message)
        }
      })
    }else{
      setErr('All fields are required')
    }
  }
  return (
    <div>
         <div className="gray-background-admin ">
       <div className='signup-admin'>
  <div className='signup-connect-admin'>
   
  </div>
  <div className='signup-classic-admin'>
  <p className='errorMessage'>{err}</p>
    <form  className='form' onSubmit={handleSubmit}>
      <fieldset className='email'>
        <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}  required/>
      </fieldset>
      <fieldset className='password'>
        <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
      </fieldset>
      <button type="submit" style={{ color:'white' }}  className="btn">Login</button>
    </form>
  </div>
</div></div>
    </div>
  )
}

export default AdminLogin

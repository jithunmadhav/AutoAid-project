import React from 'react'
import './UserLogin.css'
import { Link } from 'react-router-dom'
function UserLogin() {
  return (
    <div >
        <div className="gray-background ">
       <div className='signup'>
  <div className='signup-connect'>
   
  </div>
  <div className='signup-classic'>
    <form  className='form'>
      <fieldset className='email'>
        <input type="email" placeholder="email"   required/>
      </fieldset>
      <fieldset className='password'>
        <input type="password" placeholder="password"   required/>
      </fieldset>
      <button type="submit" className="btn">Login</button>
    </form>
    <Link style={{textDecoration:'none',display:'flex' ,justifyContent:'center'}} to='/userSignup' >signup</Link>
  </div>
</div></div>
    </div>
  )
}

export default UserLogin

import React from 'react'
import './UserLogin.css'
function UserLogin() {
  return (
    <>
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
  </div>
</div>
    </>
  )
}

export default UserLogin

import React from 'react'
import  './AdminLogin.css'
function AdminLogin() {
  return (
    <div>
         <div className="gray-background-admin ">
       <div className='signup-admin'>
  <div className='signup-connect-admin'>
   
  </div>
  <div className='signup-classic-admin'>
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
</div></div>
    </div>
  )
}

export default AdminLogin

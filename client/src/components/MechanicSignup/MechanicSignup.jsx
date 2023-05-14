import React from 'react'
import './MechanicSignup.css'
function MechanicSignup() {
  return (
    <div>
      <div className='signup-background'>
       <div className='Signup'>
  <div className='Signup-connect-mechanic '>
  </div>
  <div className='Signup-classic'>
    
    <form className='Form'>
      <fieldset className='username'>
        <input type="text" placeholder="username" required/>
      </fieldset>
      <fieldset className='email'>
        <input type="email" placeholder="email" required/>
      </fieldset>
      <fieldset className='password'>
        <input type="text" placeholder="Mobile"  required/>
      </fieldset>
      <fieldset className='password'>
        <input type="password" placeholder="password"  required/>
      </fieldset>
      <fieldset className='password'>
        <input type="password" placeholder="confirm password"  required/>
      </fieldset>
      <button type="submit" className="btn">Next</button>
    </form>
  </div>
</div>
    </div>
    </div>
  )
}

export default MechanicSignup

import React from 'react'
import './UserSignup.css'

function UserSignup() {
  return (
    <div className='signup-background'>
       <div className='Signup'>
  <div className='Signup-connect'>
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
      <button type="submit" className="btn">sign up</button>
    </form>
  </div>
</div>
    </div>
  )
}

export default UserSignup

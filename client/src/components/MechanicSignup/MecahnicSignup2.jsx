import React from 'react'

function MecahnicSignup2() {
  return (
    <div>
      <div className='signup-background'>
       <div className='Signup'>
  <div className='Signup-connect-mechanic '>
  </div>
  <div className='Signup-classic'>
    
    <form className='Form'>
      <fieldset className='username'>
        <input type="text" placeholder="place" required/>
      </fieldset>
      <fieldset className='username'>
        <input type="text" placeholder="work experience" required/>
      </fieldset>
      <fieldset className='username'>
        <label style={{ fontSize:'14px' }}>Resume</label>
        <input type="file" required/>
      </fieldset>
      <button type="submit" className="btn">Signup</button>
    </form>
  </div>
</div>
    </div>
    </div>
  )
}

export default MecahnicSignup2

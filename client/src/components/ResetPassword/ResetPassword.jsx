import React, { useState } from 'react'
import './ResetPassword.css'
import axios from '../../axios'

function ResetPassword() {
    const [newPassword, setnewPassword] = useState('')
    const [rePassword, setrePassword] = useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post()
    }
  return (
    <div>
      <div className='forgot-bg'>
    <div className='inner-Div'>
    <div className="signup-connect-forgot"></div>
        <div className="signup-classic">
          <form onSubmit={handleSubmit} className="form">
            <fieldset className="email">
              <input
                type="text"
                placeholder="New password"
                 value={newPassword}
                 onChange={(e)=>setnewPassword(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="email">
              <input
                type="text"
                placeholder="Re-enter password"
                 value={rePassword}
                 onChange={(e)=>setrePassword(e.target.value)}
                required
              />
            </fieldset>
            
            <button type="submit" style={{ color: 'white' }} className="btn">
              continue
            </button>
          </form>
        </div>
    </div>
  </div>
    </div>
  )
}

export default ResetPassword

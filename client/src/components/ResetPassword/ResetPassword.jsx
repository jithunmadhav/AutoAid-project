import React, { useState } from 'react'
import './ResetPassword.css'
import axios from '../../axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function ResetPassword(props) {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [newPassword, setnewPassword] = useState('')
    const [rePassword, setrePassword] = useState('')
    const [err, seterr] = useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(newPassword===rePassword){
          if(props.data.mechReset){
            axios.post('/mechanic/resetPassword',{newPassword,...props.data}).then((response)=>{
              console.log(response.data);
              if(!response.data.err){

                  dispatch({type:'refresh'})
                  navigate('/mechanic/login')
              }
          })
          }else{
            axios.post('/user/resetPassword',{newPassword,...props.data}).then((response)=>{
                console.log(response.data);
                if(!response.data.err){

                    dispatch({type:'refresh'})
                    navigate('/user/login')
                }
            })
          }
        }else{
            seterr('password are not same')
        }
    }
  return (
    <div>
      <div className='forgot-bg'>
    <div className='inner-Div'>
    <div className="signup-connect-reset"></div>
        <div className="signup-classic">
        <p className="errorMessage">{err}</p>
          <form onSubmit={handleSubmit} className="form">
            <fieldset className="email">
              <input
                type="password"
                placeholder="New password"
                 value={newPassword}
                 onChange={(e)=>setnewPassword(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="email">
              <input
                type="password"
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

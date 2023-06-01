import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'

function MechanicProfile() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {mechanic} =useSelector((state)=>{
      return state
    })
    const handleLogout=()=>{
      axios.get('/mechanic/logout').then((response)=>{
        if(!response.data.err){
          console.log(response.data);
          dispatch({type:'refresh'})
          return navigate('/mechanic/login')
        }
      })
    }
  return (
    <div className='profile-background'>
      <div className='inner-div'>
        <h3 className='heading'>Profile</h3>
        <button className='logout-btn' onClick={handleLogout} >Logout</button>
        <div className='inner-div2'>
          <div className='div2-sub1'>
            <div className='profile-img'>
            <img src= 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680295524~exp=1680296124~hmac=02e23136e23578ef52071ce6ce8be6ecd2a32c6bef946fcacd4e6e788ed33360' style={{objectFit:'cover'}} alt='' width="100"  className="rounded-circle" />
            </div>
            <div>
            <p  className='name'>{mechanic.details[0].name}</p>
            <p style={{ marginTop:'-17px' }} className='name'>{mechanic.details[0].email}</p>
            <button className='edit-btn'>Edit</button>

            </div>
          </div>
          <div className='div2-sub2'></div>
        </div>
      </div>
    </div>
  )
}

export default MechanicProfile

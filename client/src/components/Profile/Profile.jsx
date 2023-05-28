import React from 'react'
import { useSelector } from 'react-redux'
import './Profile.css'
function Profile() {
  const {user} =useSelector((state)=>{
    return state
  })
  return (
    <div className='profile-background'>
      <div className='inner-div'>
        <h3 className='heading'>Profile</h3>
        <button className='logout-btn'>Logout</button>
        <div className='inner-div2'>
          <div className='div2-sub1'>
            <div className='profile-img'>
            <img src= 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680295524~exp=1680296124~hmac=02e23136e23578ef52071ce6ce8be6ecd2a32c6bef946fcacd4e6e788ed33360' style={{objectFit:'cover'}} alt='' width="100"  className="rounded-circle" />
            </div>
            <div>
            <p  className='name'>{user.details[0].name}</p>
            <p style={{ marginTop:'-17px' }} className='name'>{user.details[0].email}</p>
            <button className='edit-btn'>Edit</button>

            </div>
          </div>
          <div className='div2-sub2'></div>
        </div>
      </div>
    </div>
  )
}

export default Profile

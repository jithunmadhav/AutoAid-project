import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'
import './MechanicProfile.css'
import EditMechanicProfile from './EditMechanicProfile'

function MechanicProfile() {
  const [openEditform, setopenEditform] = useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {mechanic} =useSelector((state)=>{
      return state
    })
    console.log(mechanic);
    const handleLogout=()=>{
      axios.get('/mechanic/logout').then((response)=>{
        if(!response.data.err){
          console.log(response.data);
          dispatch({type:'refresh'})
          return navigate('/mechanic/login')
        }
      })
    }
    const editProfile=()=>{
      setopenEditform(true)
    }
  return (
    openEditform?<EditMechanicProfile data={{...mechanic.details[0]}}/>:
    <div className='mechanic-profile-background'>
      <div className='mechanic-profile-inner-div'>
        <h3 className='mechanic-profile-heading'>Profile</h3>
        <button className='logout-btn' onClick={handleLogout} >Logout</button>
        <div className='mechanic-profile-inner-div2'>
          <div className='mechanic-profile-div2-sub1'>
            <div className='mechanic-profile-img'>
            <img src= 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680295524~exp=1680296124~hmac=02e23136e23578ef52071ce6ce8be6ecd2a32c6bef946fcacd4e6e788ed33360' style={{objectFit:'cover'}} alt='' width="100"  className="rounded-circle" />
            </div>
            <div>
            <p  className='name'>{mechanic.details[0].name}</p>
               <p style={{ marginTop:'-17px' }} className='name'>{mechanic.details[0].mobile}</p>
            

            <button onClick={editProfile} className='mechanic-profile-edit-btn'>Edit</button>

            </div>
          </div>
          <div className='mechanic-profile-div2-sub2'>
          <h5 className='mechanic-profile-head'>Services</h5>
          <ul className='mechanic-profile-para'>
             {
            mechanic.details[0].service.map((item) => {
            return <li style={{ textAlign: 'left' }}>{item}</li>
             })
             }
           </ul>
           <p style={{ marginTop:'-17px' }} className='name'>Email :{mechanic.details[0].email}</p>
            <p style={{ marginTop:'-17px' }} className='name'>Experience :{mechanic.details[0].experience} years </p>
            <p style={{ marginTop:'-17px' }} className='name'>Minimum amount :{mechanic.details[0].minAmount} /- </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default MechanicProfile

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Profile.css'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBInput,
} from 'mdb-react-ui-kit';
import { Button, ButtonBase } from '@mui/material';
import { useEffect } from 'react'

function Profile() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {user} =useSelector((state)=>{
    return state
  })
  const handleLogout=()=>{
    axios.get('/user/logout').then((response)=>{
      if(!response.data.err){
        console.log(response.data);
        dispatch({type:'refresh'})
        return navigate('/')
      }
    })
  }
  const [refresh, setRefresh] = useState(false)
const [varyingModal, setVaryingModal] = useState(false);
const [name, setName] = useState(user.details.name);
const [mobile, setMobile] = useState(user.details.mobile)
const handleSubmit=(e)=>{
  e.preventDefault()
  const id=user.details._id;
  if(mobile.trim() && name.trim()){
    axios.patch('/user/editprofile',{name,mobile,id}).then((response)=>{
      console.log(response.data);
      if(!response.data.err){
        setRefresh(!refresh)
        setVaryingModal(!varyingModal);
            }
    }).catch((err)=>{
      console.log(err);
    })
  }else{
    console.log('error');
  }
}
useEffect(() => {

}, [refresh])
  return (
    <div className='profile-background'>
      <div className='inner-div'>
        <h3 className='heading'>Profile</h3>
        <button className='logout-btn' onClick={handleLogout} >Logout</button>
        <div className='inner-div2'>
        <div className='profile-img'>
            <img src= 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680295524~exp=1680296124~hmac=02e23136e23578ef52071ce6ce8be6ecd2a32c6bef946fcacd4e6e788ed33360' style={{objectFit:'cover'}} alt='' width="100"  className="rounded-circle" />
            </div>
            <div>
            <p  className='name'>{user.details.name}</p>
            <p style={{ marginTop:'-17px' }} className='name'>{user.details.email}</p>
            <button onClick={() => {setVaryingModal(!varyingModal);}} className='edit-btn'>Edit</button>

            </div>
        </div>
      </div>
      <MDBModal show={varyingModal} setShow={setVaryingModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit profile</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setVaryingModal(!varyingModal)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  {varyingModal && (
                    <MDBInput
                      value={name}
                      onChange={(e)=>{setName(e.target.value)}}
                       
                    />
                  )}
                </div>
                <div className='mb-3'>
                  {varyingModal && (
                    <MDBInput
                      value={mobile}
                      onChange={(e)=>{setMobile(e.target.value)}}
                      
                      
                    />
                  )}
                </div>
                <div style={{ display:'flex',justifyContent:'space-evenly',marginTop:'80px' }}>
                  <Button onClick={() => {setVaryingModal(!varyingModal);}} variant='outlined' color='error'>close</Button>
                  <Button type='submit' variant='outlined' color='success'>save</Button>
                </div>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
    
  )
}

export default Profile

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
  const [name, setName] = useState('');
  const [editname, seteditname] = useState(user.details.name)
const [mobile, setMobile] = useState('')
const [refresh, setRefresh] = useState(false)
  useEffect(() => {
   axios.get('/user/auth').then((response)=>{
    if(!response.data.err){
console.log(response.data);
    setName(response.data.details.name)
    setMobile(response.data.details.mobile)
    }
  }).catch((error)=>{
    console.log(error);
   })
  }, [refresh])
  const handleLogout=()=>{
    axios.get('/user/logout').then((response)=>{
      if(!response.data.err){
        console.log(response.data);
        dispatch({type:'refresh'})
        return navigate('/')
      }
    })
  }
const [varyingModal, setVaryingModal] = useState(false);

const handleSubmit=(e)=>{
  e.preventDefault()
  console.log(mobile,name);
  const id=user.details._id;
  if(mobile.toString().trim() && name.trim()){
    axios.patch('/user/editprofile',{name,mobile,id}).then((response)=>{
      if(!response.data.err){
        seteditname(name)
        setVaryingModal(!varyingModal);
        setRefresh(!refresh)
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
            <p  className='name'>{editname}</p>
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

import { Button } from '@mui/material';
import React, { useState } from 'react';
import MechanicManagement from './MechanicManagement';
import axios from '../../axios'

function MechanicDetails(props) {
  console.log(props.data._id);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const imgURL='https://server.autoaid.online/uploads/'
  const id=props.data._id;
  const handleApprove=()=>{
    axios.post('/admin/approve',{id}).then((response)=>{
      if(!response.data.err){
        setShowUserManagement(true)
      }
    })
  }
  const handleReject=()=>{
    axios.post('/admin/reject',{id}).then((response)=>{
      if(!response.data.err){
        setShowUserManagement(true)
      }
    })
  }

  return (
    showUserManagement ? (
      <MechanicManagement />
    ) : (
      <div>
        <Button
          style={{ position: 'absolute', right: '101px', top: '105px' }}
          onClick={() => setShowUserManagement(true)}
          variant="outlined"
        >
          Back
        </Button>
        <div style={{ height: '80vh' }}>
          {<img src={imgURL+props.data.proof.filename} alt="PDF" style={{ width: '100%', height: '93%', objectFit: 'contain' , marginTop:'45px' }} />}
        </div>
        <div style={{ marginTop:'22px',display:'flex' ,justifyContent:'center' }}>
          <Button variant='outlined' onClick={handleApprove} color='success'> Approve</Button>
          <Button></Button>
          <Button variant='outlined' onClick={handleReject} color='error'> Reject</Button>
        </div>
      </div>
    )
  );
}

export default MechanicDetails;

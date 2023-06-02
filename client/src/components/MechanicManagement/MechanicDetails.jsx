import { Button } from '@mui/material';
import React, { useState } from 'react';
import MechanicManagement from './MechanicManagement';
import axios from '../../axios'

function MechanicDetails(props) {
  console.log(props.data.details);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const imgURL='http://localhost:4000/uploads/'
  const handleApprove=()=>{
    
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
          {<img src={imgURL+props.data.details.proof.filename} alt="PDF" style={{ width: '100%', height: '93%', objectFit: 'contain' , marginTop:'45px' }} />}
        </div>
        <div style={{ marginTop:'22px',display:'flex' ,justifyContent:'center' }}>
          <Button variant='outlined' onClick={handleApprove} color='success'> Approve</Button>
          <Button></Button>
          <Button variant='outlined' color='error'> Reject</Button>
        </div>
      </div>
    )
  );
}

export default MechanicDetails;

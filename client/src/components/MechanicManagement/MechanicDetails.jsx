import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import MechanicManagement from './MechanicManagement';
import axios from '../../axios';

function MechanicDetails(props) {
  console.log(props.data.details.pdf);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [pdfImage, setPdfImage] = useState('');

  useEffect(() => {
    const getPdfImage = async () => {
      try {
        const response = await axios.get(`/admin/pdftoimage/${props.data.details.pdf.filename}`);
        setPdfImage(response.data.image);
      } catch (error) {
        console.log(error);
      }
    };

    getPdfImage();
  }, [props.data.details.pdf.filename]);

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
        <div style={{ height: '100vh' }}>
          {pdfImage && <img src={pdfImage} alt="PDF" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
        </div>
      </div>
    )
  );
}

export default MechanicDetails;

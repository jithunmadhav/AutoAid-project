// import React, { useState } from 'react';
// import axios from '../axios';

// const RefundForm = () => {
//   const [paymentId, setPaymentId] = useState('');
//   const [refundAmount, setRefundAmount] = useState('');
//   const [refundStatus, setRefundStatus] = useState('');

//   const handleRefund = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/user/refund', { paymentId, refundAmount });
//       console.log(response.data);
//       if (response.data.success) {
//         setRefundStatus('Refund successful');
//       } else {
//         setRefundStatus('Refund failed');
//       }
//     } catch (error) {
//       setRefundStatus('Refund failed');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleRefund}>
//         <input
//           type="text"
//           value={paymentId}
//           onChange={(e) => setPaymentId(e.target.value)}
//           placeholder="Payment ID"
//         />
//         <input
//           type="text"
//           value={refundAmount}
//           onChange={(e) => setRefundAmount(e.target.value)}
//           placeholder="Refund Amount"
//         />
//         <button type="submit">Refund</button>
//       </form>
//       <p>{refundStatus}</p>
//     </div>
//   );
// };

// export default RefundForm;

import React, { ChangeEvent, useState } from 'react';
import { Button } from '@mui/material';
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

export default function App() {
  const [varyingState, setVaryingState] = useState('');
  const [varyingModal, setVaryingModal] = useState(false);
  const [varyingRecipient, setVaryingRecipient] = useState('');
  const [varyingMessage, setVaryingMessage] = useState('');

  // const onChangeRecipient = (event: ChangeEvent<HTMLInputElement>) => {
  //   setVaryingRecipient(event.target.value);
  // };

  // const onChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
  //   setVaryingMessage(event.target.value);
  // };

  return (
    <>
    <button   onClick={() => {setVaryingModal(!varyingModal);}}>hello</button>
     
   

      <MDBModal show={varyingModal} setShow={setVaryingModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Cancel booking</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setVaryingModal(!varyingModal)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <div className='mb-3'>
                  {varyingModal && (
                    <MDBTextArea
                    placeholder='Reason to cancel booking'
                      value={varyingMessage}
                      onChange={(e)=>{setVaryingMessage(e.target.value)}}
                       
                    />
                  )}
                </div>
                <div className='mb-3'>
                  {varyingModal && (
                    <MDBInput
                    placeholder='Enter payment Id'
                      value={varyingRecipient}
                      onChange={(e)=>{setVaryingRecipient(e.target.value)}}
                      
                      
                    />
                  )}
                </div>
                <div className='mb-3'>
                  {varyingModal && (
                    <MDBInput
                    placeholder='Enter amount'
                      value={varyingRecipient}
                      onChange={(e)=>{setVaryingRecipient(e.target.value)}}
                      
                      
                    />
                  )}
                </div>
                <div style={{ display:'flex',justifyContent:'space-evenly',marginTop:'80px' }}>
                  <Button variant='outlined' color='error'>close</Button>
                  <Button variant='outlined' color='success'>confirm</Button>
                </div>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
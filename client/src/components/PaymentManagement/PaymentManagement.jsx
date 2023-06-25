import React, { useEffect, useState } from 'react'
import './PaymentManagement.css'
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import axios from '../../axios';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
  } from '@coreui/react';
import { useDispatch } from 'react-redux';
import SuccessfullPayment from './SuccessfullPayment';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
function PaymentManagement() {
    const dispatch = useDispatch()
    const [result, setresult] = useState([])
    const [visible, setVisible] = useState(false)
    const [data, setdata] = useState('')
    const [openSuccessPayment, setopenSuccessPayment] = useState(false)
    useEffect(() => {
      axios.get('/admin/paymentrequest').then((response)=>{
        setresult(response.data.result)
      }).catch((error)=>{
        console.log(error);
      })
    }, [visible])

    const handlePayment=()=>{
     createOrder()
    }
    
  const [orderId, setOrderId] = useState('');
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const loadRazorpayScript = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = handleRazorpayScriptLoad;
    document.body.appendChild(script);
  };

  const handleRazorpayScriptLoad = () => {
    // Razorpay script has been loaded
    // You can initialize the payment here or wait for user interaction
  };

  const createOrder = async () => {
    try {
      const response = await axios.post('/admin/createpayment',{...data});
      const { orderId } = response.data;
      setOrderId(orderId);
      setPaymentError('');
      initiateRazorpayPayment(orderId);
    } catch (error) {
      setOrderId('');
      setPaymentError('Failed to create order');
      console.error(error);
    }
  };

  const initiateRazorpayPayment = (orderId) => {
    const options = {
      key: 'rzp_test_CbGFfMm3j0aAgq',
      amount: data.amount*100, // Amount in paise (e.g., 50000 for ₹500)
      currency: 'INR',
      name: 'AUTO AID', // Your business name
      description: 'Online Transaction',
      image: 'https://i.ibb.co/zSMfgvM/Logo.png',
      order_id: orderId.id,
      handler: async (response) => {
        try {
          await verifyPayment(response, orderId);
        } catch (error) {
          console.error(error);
          setPaymentError('Payment verification failed');
        }
      },
      prefill: {
        name: 'John Doe', // Customer's name
        email: 'john@example.com', // Customer's email
        contact: '9876543210', // Customer's contact number
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error('Razorpay script is not loaded');
    }
  };

  const verifyPayment = async (payment, orderId) => {
    try {
    
      const response = await axios.post('/admin/verifyPayment', {data,payment,orderId });
      console.log(response);
      if (!response.data.err) {
          dispatch({type:'refresh'})
          setVisible(false)
      } else {
        // Payment failed
        console.log('Payment failed');
      }
    } catch (error) {
      console.error(error);
      setPaymentError('Payment verification failed');
    }
  };
   
  return (
  openSuccessPayment ? <SuccessfullPayment/> :
    <div >
          <Button
          onClick={()=>setopenSuccessPayment(true)}
          style={{ position: 'absolute', right: '101px', top: '105px' }}
          variant="outlined"
        >
          Successfull payment
        </Button>
              <div className='paymentmanagement-table-div'>
                {result.length ===0 ?
                 <Typography variant="h6" component="h6" textAlign='center'>
                 No new applications.
               </Typography> :
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Mechanic name</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell>
            <StyledTableCell align="center">Account no&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Bank&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Branch&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.amount}</StyledTableCell>
              <StyledTableCell align="center">{row.accountnumber}</StyledTableCell>
              <StyledTableCell align="center">{row.bankname}</StyledTableCell>
              <StyledTableCell align="center">{row.branch}</StyledTableCell>
              <StyledTableCell align="center"><Button onClick={()=>{setVisible(true); setdata(row)}}>Approve</Button></StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    }
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)} className="custom-modal">
  <CModalHeader style={{ justifyContent: 'center' }} closeButton={false} className="custom-modal-header">
    <CModalTitle>Confirmation</CModalTitle>
  </CModalHeader>
  <CModalBody className="custom-modal-body">
    <p style={{ textAlign:'center' }}>Are you sure to approve the payment ?</p>
  
  </CModalBody>
  <CModalFooter  style={{ justifyContent: 'space-evenly' }} className="custom-modal-footer">
    <Button variant='outlined'  color="error" onClick={() => setVisible(false)}>
      Cancel
    </Button>
    <Button onClick={()=>handlePayment()} variant='outlined'  color="success">
      Continue
    </Button>
  </CModalFooter>
</CModal>
        </div>
    </div>
 
  )
}

export default PaymentManagement

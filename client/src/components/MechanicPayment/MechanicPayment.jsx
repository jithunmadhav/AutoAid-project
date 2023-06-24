import React, { useEffect, useState } from 'react'
import './MechanicPayment.css'
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PaymentWithdrawForm from './PaymentWithdrawForm';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import axios from '../../axios'
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
  
function MechanicPayment() {
     const [openPaymentWithdraw, setopenPaymentWithdraw] = useState(false)
     const {mechanic} = useSelector(state => state)
     const mechanic_id=mechanic.details[0]._id;
     const [result, setresult] = useState([])
     useEffect(() => {
       axios.get('/mechanic/paymentrequest',{params:{id:mechanic_id}}).then((response)=>{
         if(!response.data.err){
           setresult(response.data.result)
         }
       }).catch((err)=>{
        console.log(err);
       })
     }, [])


    
  return (
    openPaymentWithdraw ? <PaymentWithdrawForm/>:
    <div className='mechanic-payment-bg'>
    <div className='mechanic-payment-inner-div'>
      <h6 className='mechanic-payment-heading'>wallet</h6>
      <p className='mechanic-payment-para'>Balance : {mechanic.details[0].wallet}</p>
     <Button onClick={()=>setopenPaymentWithdraw(true)} className='mechanic-payment-button'>withdraw</Button>
    </div>
    
      <div className='mechanic-payment-maindiv-2'>
       <h6 style={{ color:'white',fontFamily:'monospace' }}>Payment history :</h6>
       {result.length ===0 ?
          <Typography variant="h6" component="h6" textAlign='center' style={{ color:'white' }}>
          No history found.
        </Typography>:
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Acc No</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Bank&nbsp; </StyledTableCell>
            <StyledTableCell align="center">Branch&nbsp; </StyledTableCell>
            <StyledTableCell align="center">Amount&nbsp; </StyledTableCell>
            <StyledTableCell align="center">status&nbsp; </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.accountnumber}
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.bankname}</StyledTableCell>
              <StyledTableCell align="center">{row.branch}</StyledTableCell>
              <StyledTableCell align="center">{row.amount}</StyledTableCell>
              {row.paymentstatus=='pending' ?
              <StyledTableCell style={{ color:'red' }} align="center">{row.paymentstatus}</StyledTableCell>:
              <StyledTableCell style={{ color:'green' }} align="center">{row.paymentstatus}</StyledTableCell>
              }
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
      }
      </div>
      
  </div>
  )
}

export default MechanicPayment

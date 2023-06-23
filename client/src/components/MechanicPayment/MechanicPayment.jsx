import React, { useState } from 'react'
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
      function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
        
        
      ];


    
  return (
    openPaymentWithdraw ? <PaymentWithdrawForm/>:
    <div className='mechanic-payment-bg'>
    <div className='mechanic-payment-inner-div'>
      <h6 className='mechanic-payment-heading'>wallet</h6>
      <p className='mechanic-payment-para'>Balance : 2500</p>
     <Button onClick={()=>setopenPaymentWithdraw(true)} className='mechanic-payment-button'>withdraw</Button>
    </div>
    
      <div className='mechanic-payment-maindiv-2'>
       <h6 style={{ color:'white',fontFamily:'monospace' }}>Payment history :</h6>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Acc No</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Branch&nbsp; </StyledTableCell>
            <StyledTableCell align="center">IFSC&nbsp; </StyledTableCell>
            <StyledTableCell align="center">Amount&nbsp; </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.calories}</StyledTableCell>
              <StyledTableCell align="center">{row.fat}</StyledTableCell>
              <StyledTableCell align="center">{row.carbs}</StyledTableCell>
              <StyledTableCell align="center">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      
      </div>
      
  </div>
  )
}

export default MechanicPayment

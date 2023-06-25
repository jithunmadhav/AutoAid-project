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
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from '../../axios';
import PaymentManagement from './PaymentManagement';
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
function SuccessfullPayment() {
    const [result, setresult] = useState([])
    const [openPaymentmanagement, setopenPaymentmanagement] = useState(false)  
      useEffect(() => {
        axios.get('/admin/successpayment').then((response)=>{
          setresult(response.data.result)
        }).catch((error)=>{
          console.log(error);
        })
      }, [])
  return (
    openPaymentmanagement ? <PaymentManagement/> :
    <div >
          <Button
          onClick={()=>setopenPaymentmanagement(true)}
          style={{ position: 'absolute', right: '101px', top: '105px' }}
          variant="outlined"
        >
          pending payment
        </Button>
              <div className='paymentmanagement-table-div'>
              {result.length ===0 ?
                 <Typography variant="h6" component="h6" textAlign='center'>
                 No successfull payments.
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

export default SuccessfullPayment

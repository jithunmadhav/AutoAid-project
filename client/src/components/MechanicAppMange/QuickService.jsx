import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './MechanicAppMange.css'
import axios from '../../axios';
import { useSelector } from 'react-redux';
import MechanicAppManage from './MechanicAppMange';
import BookingDetails from './BookingDetails';
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

function QuickService() {
    const [openDetails, setopenDetails] = useState(false)
    const [openSchedule, setopenSchedule] = useState(false)
    const [details, setdetails] = useState([])
    const [result, setresult] = useState([])
    const {mechanic} = useSelector(state => state)
    const id=mechanic.details[0]._id;
  useEffect(() => {
   axios.get(`/mechanic/getEmergencyApp/${id}`).then((response)=>{
    if(!response.data.err){
        setresult(response.data.result)
    }
   })
  }, [])


 console.log(openSchedule,openDetails);

  return (
    openSchedule ? <MechanicAppManage/> :
    openDetails ? <BookingDetails data={details} /> :
   <>
  <div className='dashboard-background'>
    <Button className='serviceschedule-btn' onClick={()=>setopenSchedule(true)} style={{ position:'absolute' }} variant='outlined' color='secondary' >Scheduled service</Button>
        <div className='table-div'>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer name</StyledTableCell>
            <StyledTableCell align="center">location</StyledTableCell>
            <StyledTableCell align="center">selected service</StyledTableCell>
            <StyledTableCell align="center">complaint&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Status&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Action&nbsp;</StyledTableCell>
           

          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.username}
              </StyledTableCell>
              <StyledTableCell align="center">{row.userLocation}</StyledTableCell>
              <StyledTableCell align="center">{row.selectedService}</StyledTableCell>
              <StyledTableCell align="center">{row.complaint}</StyledTableCell>
              <StyledTableCell align="center">{row.status}</StyledTableCell>
              <StyledTableCell align="center"><Button onClick={()=>{setopenDetails(true); setdetails(row)}}>View Details</Button></StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    </div>
 
   </>
  )
}

export default QuickService;

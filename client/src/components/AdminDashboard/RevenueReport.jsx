
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
import axios from '../../axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import AdminDashboard from './AdminDashboard';


// Custom styled component for the TextField label
const WhiteLabel = styled('label')({
  color: 'black',
});

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

function CompletedHistory() {
    const [date1, setdate1] = useState('')
    const [date2, setdate2] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
    const [back, setback] = useState(false)
    const [result, setresult] = useState([])
  useEffect(() => {
   axios.get(`/admin/revenuereport`,{params: {
    search: search,
    page: currentPage,

  }}).then((response)=>{
    if(!response.data.err){
        setresult(response.data.result)
        setTotalPages(response.data.totalPages);
    }
   })
  }, [search])
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
 const handleFilter=()=>{
      console.log(date1,date2);
      axios.post('/admin/filterdaterevenue',{date1,date2}).then((response)=>{
        if(!response.data.err){
            setresult(response.data.filter)
        }
      }).catch((error)=>{
        console.log(error);
      })
 }

  return (
    back ? <AdminDashboard/> :
      <>
  <div >
    <div className='date-filter'>
     <Button style={{ color:'black' }}>From</Button>
    <input name='date1' value={date1} onChange={(e)=>setdate1(e.target.value)} type="date" />
    <Button  style={{ color:'black' }}>To</Button>
    <input name='date2' value={date2} onChange={(e)=>setdate2(e.target.value)} type="date" />
    <Button onClick={()=>handleFilter()} style={{ height:'38px',marginTop:'-4px' }} variant='outlined'>Filter</Button>
    </div>
  <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            position: 'absolute',
            right: '14%',
            top: '11%',
          }}
          noValidate
          autoComplete="off"
        >
   <TextField
  id="standard-basic"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  label={
    <WhiteLabel>
      search
    </WhiteLabel>
  }
  variant="standard"
/>   
        </Box>
    <Button className='serviceschedule-btn' style={{ position:'absolute' }} onClick={()=>setback(true)}  variant='outlined' color='secondary' >Back</Button>
   
        <div  className='table-div'>
        {result.length!==0 ?
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="center">Mechanic name</StyledTableCell>
            <StyledTableCell align="center">User name</StyledTableCell>
            <StyledTableCell align="center">selected booking</StyledTableCell>
            <StyledTableCell align="center">selected service</StyledTableCell>
            <StyledTableCell align="center">complaint&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell>


          </TableRow>
        </TableHead>
        
        <TableBody>
          {result.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.booking_type === 'Scheduled booking' ?new Date(row.selectedDate).toLocaleDateString() : new Date().toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell align="center">{row.mechanic_name}</StyledTableCell>
              <StyledTableCell align="center">{row.username}</StyledTableCell>
              <StyledTableCell align="center">{row.booking_type}</StyledTableCell>
              <StyledTableCell align="center">{row.selectedService}</StyledTableCell>
              <StyledTableCell align="center">{row.complaint}</StyledTableCell>
              <StyledTableCell align="center">{row.amount}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> :
    <Typography variant="h6" style={{ color:'white' }} component="h6" textAlign='center'>
    No data found.
  </Typography>        }
        </div>
        <Stack spacing={2} sx={{position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-50%)'}}>
          <Pagination
          variant="outlined"
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
    </div>
 
   </>
  )
}

export default CompletedHistory

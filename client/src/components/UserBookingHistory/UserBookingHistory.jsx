import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './UserBookingHistory.css';
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
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import BookingStatus from '../BookingStatus/BookingStatus';
import CompletedHistory from './CompletedHistory';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// Custom styled component for the TextField label
const WhiteLabel = styled('label')({
  color: 'white',
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

function UserBookingHistory() {
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowBackdrop(false);
      setShowSuccessPage(true);
    }, 1500);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [openHistory, setOpenHistory] = useState(false);
  const [result, setResult] = useState([]);
  const [details, setDetails] = useState([]);
  const { user } = useSelector(state => state);
  const id = user.details._id;
  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    axios.get(`/user/newbooking`, {
      params: {
        search: search,
        page: currentPage,
        id
      }
    }).then((response) => {
      if (!response.data.err) {
        setResult(response.data.result);
        setTotalPages(response.data.totalPages);
      }
    });
  }, [search, currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {showBackdrop && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {showSuccessPage && (
        <>
          {openDetails ? <BookingStatus data={{ ...details }} /> :
            openHistory ? <CompletedHistory /> :
              <>
                <div className='dashboard-background'>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '12ch' },
                    }}
                    className='search'
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
                  <Button className='view-btn' onClick={() => setOpenHistory(true)} variant='outlined' color='secondary'>View History</Button>
                  <div className='table-div'>
                    {result.length !== 0 ?
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Date</StyledTableCell>
                              <StyledTableCell align="center">Mechanic name</StyledTableCell>
                              <StyledTableCell align="center">selected booking</StyledTableCell>
                              <StyledTableCell align="center">complaint&nbsp;</StyledTableCell>
                              <StyledTableCell align="center">Mechanic mobile&nbsp;</StyledTableCell>
                              <StyledTableCell align="center">Status&nbsp;</StyledTableCell>
                              <StyledTableCell align="center">Action&nbsp;</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {result.map((row) => (
                              <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                  {row.booking_type === 'scheduled booking' ? new Date(row.selectedDate).toLocaleDateString() : new Date().toLocaleDateString()}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.mechanic_name}</StyledTableCell>
                                <StyledTableCell align="center">{row.booking_type}</StyledTableCell>
                                <StyledTableCell align="center">{row.complaint}</StyledTableCell>
                                <StyledTableCell align="center">{row.mechanic_mobile}</StyledTableCell>
                                <StyledTableCell align="center">{row.status}</StyledTableCell>
                                <StyledTableCell align="center">
                                  {row.status === 'cancelled' ? "" :
                                    <Button onClick={() => { setOpenDetails(true); setDetails(row) }}>View status</Button>
                                  }
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer> :
                      <Typography variant="h6" style={{ color: 'white' }} component="h6" textAlign='center'>
                        No new bookings.
                      </Typography>
                    }
                  </div>
                  <Stack spacing={2} sx={{ position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-50%)' }}>
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
          }
        </>
      )}
    </>
  );
}

export default UserBookingHistory;

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import axios from '../../axios';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import BannedUser from './BannedUsers';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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

function UserManagement() {
  const [showBannedusers, setshowBannedusers] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const handleCancel = () => setSelectedUserId(null);
  const handleOpen = (id) => setSelectedUserId(id);
  const handleClose = () => setSelectedUserId(null);
  const [result, setResult] = useState([]);
  const [search, setsearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handleBan = (id) => {
    axios.patch('/admin/banuser', { id }).then((response) => {
      if (!response.data.err) {
        setSelectedUserId(null);
      } else {
        console.log(response.data.message);
      }
    });
  };

  useEffect(() => {
    axios
      .get('/admin/users/', {
        params: {
          search: search,
          page: currentPage,
        },
      })
      .then((response) => {
        console.log(response.data);
        setResult(response.data.result);
        setTotalPages(response.data.totalPages);
      });
  }, [selectedUserId, search, currentPage]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    !showBannedusers ? (
      <div className='admin-bg'>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            position: 'absolute', right: '308px', top: '87px'
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" value={search} onChange={(e) => setsearch(e.target.value)} label="search" variant="standard" />
        </Box>
        <Button
          style={{ position: 'absolute', right: '101px', top: '105px' }}
          onClick={() => setshowBannedusers(true)}
          variant="outlined"
        >
          Banned users
        </Button>

        <div style={{padding:'100px'}}>
          {result.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Mobile</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.email}</StyledTableCell>
                      <StyledTableCell align="center">{row.mobile}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          onClick={() => handleOpen(row._id)} // Pass the user ID to handleOpen
                          variant="outlined"
                          color="error"
                        >
                          Ban
                        </Button>
                      </StyledTableCell>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={selectedUserId === row._id} 
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                          backdrop: {
                            timeout: 500,
                          },
                        }}
                      >
                        <Fade in={selectedUserId === row._id}>
                          <Box sx={style}>
                            <Typography
                              style={{
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                fontSize: '25px',
                                fontWeight: 'bolder',
                              }}
                              id="transition-modal-title"
                              variant="h6"
                              component="h6"
                            >
                              Are you sure to ban?
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                                <Button variant="outlined" onClick={() => handleBan(row._id)} color="error">Confirm</Button>
                              </div>
                            </Typography>
                          </Box>
                        </Fade>
                      </Modal>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="h6" style={{ textAlign: 'center', marginTop: '20px' }}>No users found</Typography>
          )}
        </div>
        <Stack spacing={2} sx={{ position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-50%)' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    ) : (
      <BannedUser />
    )
  );
}

export default UserManagement;

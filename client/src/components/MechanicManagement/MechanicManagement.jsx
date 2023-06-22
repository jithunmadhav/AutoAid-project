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
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import BannedMechanics from './BannedMechanics';
import MechanicDetails from './MechanicDetails';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function MechanicManagement() {
  const [showBannedusers, setshowBannedusers] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const handleCancel = () => setSelectedUserId(null);
  const handleOpen = (id) => setSelectedUserId(id);
  const handleClose = () => setSelectedUserId(null);
  const [viewDetials, setviewDetials] = useState(false);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState([]);
  const [details, setDetails] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = React.useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleBan = (id) => {
    axios.patch('/admin/banmechanic', { id }).then((response) => {
      if (!response.data.err) {
        setSelectedUserId(null);
            } else {
        console.log(response.data.message);
      }
    }).catch(err=>{
      console.log(err);
    })
  };

  useEffect(() => {
    axios.get('/admin/mechanics', {
      params: {
        search: search,
        filter: filter,
        page: currentPage,
      },
    }).then((response) => {
      setResult(response.data.mechanics);
      setTotalPages(response.data.totalPages);
    }).catch(err=>{
      console.log(err);
    })
  }, [open, search, filter, currentPage,selectedUserId]);

  const style = {
    position: 'absolute',
    top: '40%',
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
    showBannedusers ? (
      <BannedMechanics />
    ) : viewDetials ? (
      <MechanicDetails data={details} />
    ) : (
      <div className='admin-bg'>
        <FormControl
          sx={{ m: 1, minWidth: 150, position: 'absolute', top: 95, left: 95, height: 10 }}
          size='small'
        >
          <InputLabel id="demo-simple-select-helper-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={filter}
            label="Age"
            onChange={(event) => setFilter(event.target.value)}
          >
            <MenuItem value="">
              <em></em>
            </MenuItem>
            <MenuItem value={'applied'}>Applied</MenuItem>
            <MenuItem value={'approved'}>Approved</MenuItem>
            <MenuItem value={'rejected'}>Rejected</MenuItem>
          </Select>
        </FormControl>

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            position: 'absolute',
            right: '338px',
            top: '87px',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="search"
            variant="standard"
          />
        </Box>
        <Button
          style={{ position: 'absolute', right: '101px', top: '105px' }}
          onClick={() => setshowBannedusers(true)}
          variant="outlined"
        >
          Banned Mechanics
        </Button>

        <div style={{ padding:'100px' }}>
          {result.length === 0 ? (
            <Typography variant="h6" component="h6" textAlign='center'>
              No Mechanics found.
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Mobile</StyledTableCell>
                    <StyledTableCell align="center">Experience</StyledTableCell>
                    <StyledTableCell align="center">App Status</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.mobile}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.experience + ' years'}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.applicationStatus}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          onClick={() => handleOpen(row._id)}
                          variant="outlined"
                          color="error"
                        >
                          Ban
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.applicationStatus === 'applied' && (
                          <Button
                            onClick={() => {
                              setviewDetials(true);
                              setDetails(row);
                            }}
                          >
                            view details
                          </Button>
                        )}
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
          )}
        </div>
        <Stack spacing={2} sx={{position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-50%)'}}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    )
  );
}

export default MechanicManagement;

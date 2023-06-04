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
import MechanicManagement from './MechanicManagement';

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

function BannedMechanics() {
  const [showUser, setshowUser] = useState(false);
  const handleCancel = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [result, setResult] = useState([]);

  const handleunBan = (id) => {
    axios.patch('/admin/unbanmechanic', { id }).then((response) => {
      if (!response.data.err) {
        setOpen(false);
      } else {
        console.log(response.data.message);
      }
    });
  };

  useEffect(() => {
    axios.get('/admin/bannedmechnics').then((response) => {
      setResult(response.data.result);
    });
  }, [open]);

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

  return (
    !showUser ? (
      <div className='admin-bg'>
        <Button
          style={{ position: 'absolute', right: '101px', top: '105px' }}
          onClick={() => setshowUser(true)}
          variant="outlined"
        >
          Back
        </Button>
        <div style={{ padding:'100px' }}>
          {result.length === 0 ? (
            <Typography variant="h5" component="div" align="center" sx={{ mt: 4 }}>
              No banned mechanics
            </Typography>
          ) : (
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
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.email}</StyledTableCell>
                      <StyledTableCell align="center">{row.mobile}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button onClick={handleOpen} variant="outlined" color="error">
                          Remove Ban
                        </Button>
                      </StyledTableCell>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                          backdrop: {
                            timeout: 500,
                          },
                        }}
                      >
                        <Fade in={open}>
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
                              Are you sure to unban?
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Button variant="outlined" onClick={handleCancel}>
                                  Cancel
                                </Button>
                                <Button
                                  variant="outlined"
                                  onClick={() => handleunBan(row._id)}
                                  color="error"
                                >
                                  Confirm
                                </Button>
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
      </div>
    ) : (
      <MechanicManagement />
    )
  );
}

export default BannedMechanics;

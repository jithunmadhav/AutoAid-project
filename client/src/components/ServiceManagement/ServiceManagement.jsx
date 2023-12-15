import React, { useEffect, useState } from 'react'
import AddService from './AddService'
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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 
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


function ServiceManagement() {
  const [selectedImageId, setSelectedImageId] = useState(null);
  const handleCancel = () => setSelectedImageId(null);
  const handleOpen = (id) => setSelectedImageId(id);
  const handleClose = () => setSelectedImageId(null);
  const [result, setResult] = useState([]);
  const [refresh, setrefresh] = useState(false)
  const [showAddService, setshowAddService] = useState(false)
  const dispatch = useDispatch()
  const navigate =useNavigate()

const handleDelete=(id)=>{
  console.log(`/admin/deleteservice/${id}`);
  axios.delete(`/admin/deleteservice/${id}`).then((response)=>{
    console.log(response);
    if(!response.data.err){
      setrefresh(!refresh)
      dispatch({type:'refresh'})
      handleCancel()
    }
  }).catch((err)=>{
    dispatch({type:'refresh'})
    navigate('/error')
  })
}

useEffect(() => {
  axios.get('/admin/allservices').then((response)=>{
    setResult(response.data.result)
  }).catch((err)=>{
    dispatch({type:'refresh'})
    navigate('/error')
  })
},[refresh])


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
    const imgURL='https://server.autoaid.online/uploads/'

  return (
    !showAddService ?
    <div className='admin-bg'>
      <Button onClick={()=>setshowAddService(true)}
       style={{ position: 'absolute', right: '101px', top: '105px' }}
      variant='outlined'>Add services</Button>
              <div style={{padding:'100px'}}>
          {result.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell> Service name</StyledTableCell>
                    <StyledTableCell align="center">Image</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.map((row,index) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {row.serviceName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {row.image.map((image, index) => (
                        <img
                        key={index}
                       style={{ width: '100px', height: '80px' }}
                        src={imgURL + image.filename}
                        alt=""
                        />
                        ))}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          onClick={() => handleOpen(row._id)} 
                          variant="outlined"
                          color="error"
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={selectedImageId === row._id} 
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                          backdrop: {
                            timeout: 500,
                          },
                        }}
                      >
                        <Fade in={selectedImageId === row._id}>
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
                              Are you sure to delete?
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                                <Button variant="outlined" onClick={() => handleDelete(row._id)} color="error">Confirm</Button>
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
            <Typography variant="h6" style={{ textAlign: 'center', marginTop: '20px' }}>No data found</Typography>
          )}
        </div>
    </div>
    :<AddService/>
  )
}

export default ServiceManagement

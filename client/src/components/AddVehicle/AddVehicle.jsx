import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import './AddVehicle.css';
import AddVehicleForm from './AddVehicleForm';
import { useDispatch, useSelector } from 'react-redux';
import EditVehicle from './EditVehicle';
import { useLocation } from 'react-router-dom';
import ComplaintForm from '../ComplaintForm/ComplaintForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function AddVehicle() {
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowBackdrop(false);
      setShowSuccessPage(true);
    }, 1500);
  }, []);

  const location = useLocation();
  const [mechanic, setMechanic] = useState(location.state); // Corrected the variable name to setMechanic
  const { user } = useSelector(state => state); // Removed the 'refresh' variable as it's not defined
  const id = user.details._id;
  const [vehicleResult, setVehicleResult] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // State to store the selected vehicle
  const dispatch = useDispatch();
  const [err, setErr] = useState(''); // Corrected the variable name to setErr
  const notify = (err) => toast(err);

  useEffect(() => {
    axios.get(`/user/allvehicle/${id}`).then((response) => {
      if (!response.data.err) {
        setVehicleResult(response.data.result[0].vehicle);
      }
    }).catch(err => {
      console.log(err);
    });
  }, [id]);

  const [openForm, setOpenForm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false); // Corrected the variable name to setOpenEdit
  const [openComplaint, setOpenComplaint] = useState(false);
  const [editResult, setEditResult] = useState(''); // Corrected the variable name to setEditResult
  const openFormHandler = () => {
    setOpenForm(true);
  };

  const editVehicle = (vehicleId, userId) => {
    axios.get('/user/vehicleDetails', { params: { vehicleId, userId } }).then((response) => {
      if (!response.data.err) {
        setEditResult(response.data.result);
        setOpenEdit(true);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const deleteVehicle = (vehicleId, userId) => {
    axios.patch('/user/deletevehicle', { vehicleId, userId }).then(() => {
      dispatch({ type: 'refresh' });
    }).catch(err => {
      console.log(err);
    });
  };

  const handleVehicleSelection = (vehicle) => {
    setSelectedVehicle(vehicle); // Set the selected vehicle in state
  };

  const openComplaintForm = () => {
    if (selectedVehicle === null) { // Corrected the comparison
      notify('Please select a vehicle');
    } else {
      setOpenComplaint(true);
    }
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
          {openForm ? <AddVehicleForm /> :
            openEdit ? <EditVehicle data={{ editResult }} /> :
              openComplaint ? <ComplaintForm data={{ mechanic, selectedVehicle }} /> :
                <div className='vehicle-background'>
                  <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                  />
                  <div className='vehicle-inner-div'>
                    <h4 className='vehicle-heading'>My Vehicle</h4>
                    <button onClick={openFormHandler} className='vehicle-btn'>+</button>
                    {
                      vehicleResult.length === 0 ?
                        <h4 style={{ textAlign: 'center', fontFamily: 'monospace' }}>No Vehicle Added</h4> :
                        vehicleResult.map((item) => {
                          return (
                            <div className='vehicle-table' key={item.Id}>
                              <div className='radio'>
                                <input
                                  type="radio"
                                  name="vehicleSelection"
                                  value={item.Id}
                                  checked={selectedVehicle === item.Id}
                                  onChange={() => handleVehicleSelection(item.Id)}
                                  required
                                />
                              </div>
                              <div className='table-mid1'>
                                <p style={{ marginBottom: '0px' }}>{item.vehicleName}</p>
                                <p style={{ marginBottom: '0px' }}>{item.regNo}</p>
                                <p style={{ marginBottom: '0px' }}>{item.manufactureYear}</p>
                              </div>
                              <div className='table-mid2'>
                                <p style={{ marginBottom: '0px' }}>{item.kilometer} KM</p>
                                <p style={{ marginBottom: '0px' }}>
                                  {item.fuel}
                                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-fuel-pump-fill" viewBox="0 0 16 16">
                                    <path d="M1 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1 2 2v.5a.5.5 0 0 0 1 0V8h-.5a.5.5 0 0 1-.5-.5V4.375a.5.5 0 0 1 .5-.5h1.495c-.011-.476-.053-.894-.201-1.222a.97.97 0 0 0-.394-.458c-.184-.11-.464-.195-.9-.195a.5.5 0 0 1 0-1c.564 0 1.034.11 1.412.336.383.228.634.551.794.907.295.655.294 1.465.294 2.081V7.5a.5.5 0 0 1-.5.5H15v4.5a1.5 1.5 0 0 1-3 0V12a1 1 0 0 0-1-1v4h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V2Zm2.5 0a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5Z" />
                                  </svg>
                                </p>
                                <p style={{ marginBottom: '0px' }}>{item.manufacture}</p>
                              </div>
                              <div style={{ width: '10%', height: '100px' }}>
                                <div className='Edit-btn' >
                                  <div onClick={() => editVehicle(item.Id, id)} style={{ marginRight: '20px' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                  </div>
                                  <div onClick={() => deleteVehicle(item.Id, id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                    }
                  </div>
                  {mechanic ? <button onClick={openComplaintForm} className='continue-btn'>continue</button> : ""}
                </div>
            }
          </>
        )}
    </>
  );
}

export default AddVehicle;

import React, { useEffect, useState } from 'react';
import AddVehiclePage from '../../Pages/AddVehiclePage';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditVehicle(props) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => {
    return state;
  });
  const id = user.details._id;
  const [closeForm, setCloseForm] = useState(false);
  const [manufacture, setManufacture] = useState(props.data.editResult.vehicle[0].manufacture);
  const [vehicleName, setVehicleName] = useState(props.data.editResult.vehicle[0].vehicleName);
  const [regNo, setRegNo] = useState(props.data.editResult.vehicle[0].regNo);
  const [kilometer, setKilometer] = useState(props.data.editResult.vehicle[0].kilometer);
  const [fuel, setFuel] = useState(props.data.editResult.vehicle[0].fuel);
  const [manufactureYear, setManufactureYear] = useState(props.data.editResult.vehicle[0].manufactureYear);
  const [err, setErr] = useState('');

  useEffect(() => {}, [closeForm]);
  const Id=props.data.editResult.vehicle[0].Id;
  const closeFormAndOpenPage = () => {
    setCloseForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      manufacture.trim() &&
      vehicleName.trim() &&
      regNo.trim() &&
      kilometer.trim() &&
      fuel.trim() &&
      manufactureYear.trim()
    ) {
      axios
        .patch('/user/editvehicle', {
          manufacture,
          vehicleName,
          regNo,
          kilometer,
          fuel,
          manufactureYear,
          id,Id
        })
        .then((response) => {
          console.log(response.data);
          if (!response.data.err) {
            setCloseForm(true);
            navigate('/addvehicle');
          } else {
            setErr(response.data.message);
          }
        }).catch((error)=>{
          console.log(error);
        })
    } else {
      setErr('All fields are required');
    }
  };

  return (
    closeForm ? (
      <AddVehiclePage />
    ) : (
      <div className='vehicle-background'>
        <div className='vehicle-inner-div'>
          <h4 className='heading'>Edit Vehicle</h4>
          <button onClick={closeFormAndOpenPage} className='vehicle-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
          </button>
          <div>
            <div className='vehicle-user'>
              <div className='vehicle-connect'>
              </div>
              <div className='vehicle-classic'>
                <p className='errorMessage'>{err}</p>
                <form style={{ marginTop: '-43px' }} className='Form' onSubmit={handleSubmit}>
                  <fieldset className='username'>
                    <input type="text" placeholder="Manufacture" value={manufacture} onChange={(e) => setManufacture(e.target.value)} required />
                  </fieldset>
                  <fieldset className='email'>
                    <input type="text" placeholder="Vehicle name" value={vehicleName} onChange={(e) => setVehicleName(e.target.value)} required />
                  </fieldset>
                  <fieldset className='password'>
                    <input type="text" placeholder="Reg no" value={regNo} onChange={(e) => setRegNo(e.target.value)} required />
                  </fieldset>
                  <fieldset className='password'>
                    <input type="number" placeholder="Kilometer" value={kilometer} onChange={(e) => setKilometer(e.target.value)} required />
                  </fieldset>
                  <FormControl sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel style={{ fontSize: '14px', marginTop: '5px' }} id="demo-simple-select-helper-label">Fuel type</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={fuel}
                      onChange={(event) => setFuel(event.target.value)}
                      className="select-input" // Add a custom CSS class
                    >
                      <MenuItem value="" />
                      <MenuItem value={'Petrol'}>Petrol</MenuItem>
                      <MenuItem value={'Diesel'}>Diesel</MenuItem>
                      <MenuItem value={'Electric'}>Electric</MenuItem>
                    </Select>
                  </FormControl>
                  <fieldset className='password'>
                    <input type="text" placeholder="Manufacture year" value={manufactureYear} onChange={(e) => setManufactureYear(e.target.value)} required />
                  </fieldset>
                  <button type="submit" style={{ color: 'white' }} className="btn">submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default EditVehicle;

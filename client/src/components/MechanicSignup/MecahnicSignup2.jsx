import React, { useEffect, useState } from 'react';
import './MechanicSignup.css'
import Axios from '../../axios';
import axios from 'axios';
import OtpVerification from '../OTPverification/OtpVerification';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function MechanicSignup2(props) {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [experience, setExperience] = useState('');
  const [err, setErr] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [file, setfile] = useState('')
  const [service, setservice] = useState([])
  const [serviceResult, setserviceResult] = useState([])
  const [minAmount, setminAmount] = useState('')

  useEffect(() => {
   Axios.get('/admin/allservices').then((response)=>{
    console.log(response.data.result);
    if(!response.data.err){
      setserviceResult(response.data.result)
    }
   })
  }, [])
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    fetchSuggestions(value);
  };
  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${process.env.REACT_APP_MAP_BOX}`
      );
      const suggestions = response.data.features.map((feature) => feature.place_name);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setSuggestions([]);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setservice(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (searchValue.trim() && experience.trim()) {
      Axios.post('/mechanic/signupComplete', { ...props }).then((response) => {
        if (!response.data.err) {
          setShowOtp(true);
        } else {
          setErr(response.data.message);
        }
      });
    } else {
      setErr('All fields are required');
    }
  };

  return (
    <div className="signup-background">
      <div className="Signup">
        <div className="Signup-connect-mechanic"></div>
        <div className="Signup-classic">
          <p className="errorMessage">{err}</p>
          <form style={{ marginTop:'-39px' }} className="Form" onSubmit={handleFormSubmit}>
            <fieldset className="username">
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Location"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                {suggestions.length > 0 && (
                  <div className="suggestion-box">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        style={{ cursor: 'pointer' }}
                      >
                        {suggestion.substring(0, 20)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </fieldset>
            <fieldset className="username">
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Work experience"
                required
              />
            </fieldset>
            <fieldset className='password'>
        <input type="number"  value={minAmount} onChange={(e=>setminAmount(e.target.value))} placeholder="Minimum amount"  required/>
          </fieldset>
           
             
            {/* <FormControl sx={{ m: 1, minWidth: 250 ,}} size='small'> 
           <InputLabel style={{ fontSize:'14px' }}  id="demo-simple-select-helper-label">Select service</InputLabel>
          <Select
           labelId="demo-simple-select-helper-label"
           id="demo-simple-select-helper"
           multiple
             value={service}
            onChange={(event) => setservice(event.target.value)}
          className="select-input" // Add a custom CSS class
           >
         <MenuItem value="">
          <em></em>
        </MenuItem>
        {serviceResult.map((item,index)=>{
         return <MenuItem value={item.serviceName}>{item.serviceName}</MenuItem>
        })}
        </Select>
        </FormControl> */}
     <FormControl sx={{ m: 1, width: 300 }} size="small">
     <InputLabel style={{ fontSize:'14px' ,marginTop:'8px' }}  id="demo-simple-select-helper-label">Select service</InputLabel>  <Select
    labelId="demo-multiple-name-label"
    id="demo-multiple-name"
    multiple
    className="select-input" 
    value={service}
    onChange={handleChange}
    input={<OutlinedInput label="Name" />}
    MenuProps={MenuProps}
  >
    {serviceResult.map((item) => (
      <MenuItem
        key={item._id}
        value={item.serviceName} // Assuming "serviceName" is the desired value to be stored in the state
        style={getStyles(item.serviceName, service, theme)}
      >
        {item.serviceName}
      </MenuItem>
    ))}
  </Select>
</FormControl>

            
            <fieldset className="username" style={{ marginTop:'-6px' }}>
              <label style={{ fontSize: '14px' }}>Resume</label>
              <input type="file" onChange={(e)=>setfile(e.target.files[0])} accept='image/*' required />
            </fieldset>
            <button type="submit" style={{ color: 'white' }} className="btn">
              Signup
            </button>
          </form>
        </div>
      </div>
      {showOtp && (
        <OtpVerification data={{ ...props.data,file, searchValue, experience,service,minAmount, reset: 'mechanicsignup' }} />
      )}
    </div>
  );
}

export default MechanicSignup2;

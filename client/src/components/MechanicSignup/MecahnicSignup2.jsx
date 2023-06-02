import React, { useState } from 'react';
import './MechanicSignup.css'
import Axios from '../../axios';
import axios from 'axios';
import OtpVerification from '../OTPverification/OtpVerification';

function MechanicSignup2(props) {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [experience, setExperience] = useState('');
  const [err, setErr] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [file, setfile] = useState('')

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    fetchSuggestions(value);
  };

  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=pk.eyJ1Ijoiaml0aHVuIiwiYSI6ImNsaWEzZjg1NzBuMngzZHBnOWZzeTJ3eDMifQ.QUWNrEcjjYw_-HbBUDquhw`
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
          <form className="Form" onSubmit={handleFormSubmit}>
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
            <fieldset className="username">
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
        <OtpVerification data={{ ...props.data,file, searchValue, experience, reset: 'mechanicsignup' }} />
      )}
    </div>
  );
}

export default MechanicSignup2;


import React, { useState } from 'react';
import axios from 'axios';

const PlaceAPI = () => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

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

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        {suggestions.map((suggestion) => (
          <div key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.substring(0, 20)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceAPI;

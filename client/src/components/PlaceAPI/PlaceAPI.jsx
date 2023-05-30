import React, { useState } from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';

function PlaceAPI() {
  const [value, setValue] = useState('');

  const handleSuggestionSelected = (suggestion) => {
    setValue(suggestion.place_name);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form>
      <AddressAutofill
        accessToken="pk.eyJ1Ijoiaml0aHVuIiwiYSI6ImNsaWEzZjg1NzBuMngzZHBnOWZzeTJ3eDMifQ.QUWNrEcjjYw_-HbBUDquhw"
        onSuggestionSelected={handleSuggestionSelected}
      >
        {({ getInputProps, suggestions, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'City',
                name: 'city',
                type: 'text',
                autoComplete: 'address-level2',
                value: value,
                onChange: handleChange,
              })}
            />
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => (
              <div key={suggestion.place_name}>{suggestion.place_name}</div>
            ))}
          </div>
        )}
      </AddressAutofill>
    </form>
  );
}

export default PlaceAPI;

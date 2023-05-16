// import React, { useRef } from 'react'
// import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';

// function PlaceComponent() {
//   const inputRef = useRef({});

//   const handlePlaceChanged = () => {
//     const [place] = inputRef.current.getPlaces();
//     if (place) {
//       console.log(place.formatted_address);
//     }
//   }

//   return (
//     <LoadScript
//       googleMapsApiKey="AIzaSyCFx5QRL3qDCzW9pN5g_3bxalk-SojrtaM"
//       libraries={['places']}
//     >
//       <StandaloneSearchBox
//         onLoad={(ref) => (inputRef.current = ref)}
//         onPlacesChanged={handlePlaceChanged}
//       >
//         <input type='text' placeholder='search' />
//       </StandaloneSearchBox>
//     </LoadScript>
//   )
// }

// export default PlaceComponent;

import React, { useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '800px'
};

const center = {
  lat: 10.1632,
  lng: 76.6413
};

function MyComponent() {
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onPlacesChanged = useCallback(() => {
    const place = searchBoxRef.current.getPlaces()[0];
    if (place) {
      mapRef.current.panTo(place.geometry.location);
      mapRef.current.setZoom(5);
    }
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCFx5QRL3qDCzW9pN5g_3bxalk-SojrtaM"
      libraries={['places']}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={onPlacesChanged}
        >
          <input type="text" placeholder="Search" style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "50%",
            marginLeft: "-120px"
          }} />
        </StandaloneSearchBox>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent);

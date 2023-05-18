import React from 'react';
import './Home.css';

function Home() {
  return (
    <>
      <div className='background'>
        <div style={{ width: '50%' }}>
          <img className='background-img' src="https://autoaid.in/auto-aid-logo.png" alt="logo" />
          <h1>
            <span className="animated-text">Drive with confidence,
            your virtual garage is 
              just a tap away</span>
          </h1>
        </div>
        <div style={{ width: '50%' }}>
          {/* Add content for the second half of the background */}
        </div>
      </div>
      <div className='secondPage'></div>
    </>
  );
}

export default Home;

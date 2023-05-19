import React from 'react';
import './Home.css';
// import { Carousel } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
  return (
    <>
      <div className='background'>
        <div style={{ width: '50%' }}>
          <img className='background-img' src="https://autoaid.in/auto-aid-logo.png" alt="logo" />
          <h1>
            <span className="animated-text">Drive with confidence, your virtual garage is just a tap away</span>
          </h1>
        </div>
        <div style={{ width: '50%' }}>
        <h1 className='home-quotes'>&emsp;Any Time <br/> &nbsp; &nbsp;Any Where <br/> Aid For Vehicle</h1>
        </div>
      </div>
      <div className='secondPage'>
      <h1 className='services'>Our Services</h1>
      </div>
    </>
  );
}

export default Home;

import React from 'react';
import './Home.css';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


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
        
        </div>
      </div>
      <div className='secondPage'>
      <Carousel fade className="carousel-container">
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src="https://mdbootstrap.com/img/new/slides/041.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src="https://mdbootstrap.com/img/new/slides/042.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src="https://mdbootstrap.com/img/new/slides/043.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
      </div>
    </>
  );
}

export default Home;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import {  useSelector } from 'react-redux';


function Navbar() {
  const {user}=useSelector((state)=>{
    return state
   });
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };
  
    const closeNavbar = () => {
      setIsOpen(false);
    };
   
  
    return (
      <nav className="navbar navBG navbar-expand-lg navbar-light bg-light nav-properties">
            {/* <img src="/images/autoaid.png" alt="" /> */}
            <h1 className='LogoName'>AUTO AID</h1>
        <div className="container">
          <Link   className="navbar-brand" to="/" onClick={closeNavbar}>
            
          </Link>
          <button
            className={`navbar-toggler ${isOpen ? '' : 'collapsed'}`}
            type="button"
            onClick={toggleNavbar}
            aria-expanded={isOpen ? 'true' : 'false'}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div  style={{ justifyContent:'flex-end' }}  className={` nav-background collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
            <ul  className="navbar-nav ml-auto ">
              <li  className="nav-item">
                <Link className="nav-link" to="/" onClick={()=>{closeNavbar();}}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addvehicle" onClick={closeNavbar}>
                  Vechicle
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/booking" onClick={closeNavbar}>
                Bookings
                </Link>
              </li>
              <li className="nav-item">
                {user.login ?(<Link className="nav-link" to="/profile" onClick={closeNavbar}>
                  {user.details.name}
                </Link>)
                :(<Link className="nav-link" to="/login" onClick={closeNavbar}>
                  Login / signup
                </Link>) }
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };
  
    const closeNavbar = () => {
      setIsOpen(false);
    };
  
    return (
      <nav className="navbar navBG navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link style={{ color:'white' }} className="navbar-brand" to="/" onClick={closeNavbar}>
            
          </Link>
          <button
            className={`navbar-toggler ${isOpen ? '' : 'collapsed'}`}
            type="button"
            onClick={toggleNavbar}
            aria-expanded={isOpen ? 'true' : 'false'}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div  className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
            <ul  className="navbar-nav ml-auto ">
              <li  className="nav-item">
                <Link className="nav-link" to="/" onClick={closeNavbar}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={closeNavbar}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog" onClick={closeNavbar}>
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact" onClick={closeNavbar}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  
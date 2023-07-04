import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
function MechanicNav() {
    const {mechanic}=useSelector((state)=>{
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
    <nav className="navbar navBG navbar-expand-lg navbar-light bg-light" style={{position:'fixed',width:'100%', zIndex:'10',marginTop:'-1px'}}>
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
          <div  style={{ justifyContent:'flex-end' }}  className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
            <ul  className="navbar-nav ml-auto ">
              {/* <li  className="nav-item">
                <Link className="nav-link" to="/mechanic/dashboard" onClick={closeNavbar}>
                  Dashboard
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/mechanic/schedule" onClick={closeNavbar}>
                  Schedule
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mechanic/appoinmentManage" onClick={closeNavbar}>
                  Appointments
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mechanic/chat" onClick={closeNavbar}>
                  Chats
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mechanic/payment" onClick={closeNavbar}>
                payment
                </Link>
              </li>
              <li className="nav-item">
                {mechanic.mechLog ?(<Link className="nav-link" to="/mechanic/profile" onClick={closeNavbar}>
                  {mechanic.details[0].name}
                </Link>)
                :(<Link className="nav-link" to="/mechanic/profile" onClick={closeNavbar}>
                  profile
                </Link>) }
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default MechanicNav

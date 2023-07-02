import React, { useState } from 'react';
import './UserLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { useDispatch } from 'react-redux';

function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [err, seterr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      try {
        const response = await axios.post('/user/login', { email, password });
        console.log(response.data);
        if (!response.data.err) {    
          dispatch({type:'refresh'})        
         return navigate('/');
        } else {
          seterr(response.data.message)
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      seterr('All fields are required');
    }
  };

  return (
    <div>
      <div className="gray-background">
        <div className="signup">
          <div className="signup-connect"></div>
          <div className="signup-classic">
            <p className="errorMessage-login">{err}</p>
            <form onSubmit={handleSubmit} className="form">
              <fieldset className="email">
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset className="password">
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
              </fieldset>
              <button type="submit" style={{ color: 'white' }} className="btn">
                Login
              </button>
            </form>
            <Link
              style={{
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'center',
                fontFamily: 'monospace',
              }}
              to="/signup"
            >
              Signup
            </Link>
            <Link
              style={{
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'center',
                fontFamily: 'monospace',
              }}
              to="/forgotPassword"
            >
              Forgot password ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;

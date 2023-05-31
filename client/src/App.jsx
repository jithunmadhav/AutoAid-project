import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLoginPage from './Pages/UserLoginPage';
import UserSignupPage from './Pages/UserSignupPage';
import MechanicLoginPage from './Pages/MechanicLoginPage';
import MechanicSignupPage from './Pages/MechanicSignupPage';
import AdminLoginPage from './Pages/AdminLoginPage';
import axios from './axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PlaceAPI from './components/PlaceAPI/PlaceAPI';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';

function App() {
  const { user, refresh } = useSelector((state) => {
    return state;
  });
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  
  useEffect(() => {
    axios.get('/admin/auth').then((response) => {
      console.log("ADMIN : ", response.data);
      dispatch({ type: 'admin', payload: { adminLog: response.data.logged, details: response.data.details } });
    });
    
    axios.get('/user/auth/').then((response) => {
      console.log("USER :", response.data);
      dispatch({ type: 'user', payload: { login: response.data.logged, details: response.data.details } });
    });
  }, [refresh,dispatch]);

  return (
    <div>
      <Router>
        <Routes>
          {user.login === false && (
            <>
              <Route element={<UserLoginPage />} path="/user/login" />
              <Route element={<UserSignupPage />} path="/user/signup" />
              <Route element={<AdminLoginPage />} path="/admin/login" />
              {/* <Route element={<MechanicLoginPage />} path="/mechanic/login" />
              <Route element={<MechanicSignupPage />} path="/mechanic/signup" /> */}
              <Route element={<PlaceAPI />} path="/place" />
              <Route element={<HomePage />} path="/" />
              <Route element={<ForgotPasswordPage/>} path={'/forgotPassword'}/>
            </>
          )}

          {user.login === true && (
            <>
              <Route element={<HomePage />} path="/" />
              <Route element={<PlaceAPI />} path="/place" />
              <Route element={<ProfilePage />} path="/user/profile" />
              <Route element={<MechanicLoginPage />} path="/mechanic/login" />
              <Route element={<MechanicSignupPage />} path="/mechanic/signup" />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

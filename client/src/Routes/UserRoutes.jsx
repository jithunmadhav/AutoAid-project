import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import AppointmentSuccess from '../components/AppoinmentSuccess/AppointmentSuccess';
import AddVehiclePage from '../Pages/AddVehiclePage';
import ForgotPasswordPage from '../Pages/ForgotPasswordPage';
import HomePage from '../Pages/HomePage';
import PlacePage from '../Pages/PlacePage';
import ProfilePage from '../Pages/ProfilePage';
import UserBookingHistoryPage from '../Pages/UserBookingHistoryPage';
import UserLoginPage from '../Pages/UserLoginPage';
import UserSchedulePage from '../Pages/UserSchedulePage';
import UserSignupPage from '../Pages/UserSignupPage';
import ErrorPage from '../Pages/ErrorPage'
function UserRoutes() {
    const { user, refresh } = useSelector((state) => state);
    const dispatch = useDispatch();
  
    useEffect(() => {  
      axios.get('/user/auth/').then((response) => {
        console.log("USER:", response.data);
        dispatch({ type: 'user', payload: { login: response.data.logged, details: response.data.details } });
      }).catch((error)=>{
        console.log(error);
      })
  
    }, [refresh, dispatch]);
  return (
    <div>
        <Routes>
          {user.login === false && (
            <>
              <Route element={<UserLoginPage />} path="/login" />
              <Route element={<UserSignupPage />} path="/signup" />
              <Route element={<HomePage />} path="/" />
              <Route element={<ForgotPasswordPage />} path={"/forgotPassword"}/>
              <Route element={<Navigate to={'/login'} />} path="/profile" />
              <Route element={<Navigate to={'/login'} />} path={'/location'} />
              <Route element={<Navigate to={'/login'} />} path='/addvehicle'/>
              <Route element={<Navigate to={'/login'} />} path='/success'/>
              <Route element={<Navigate to={'/login'} />} path='/booking'/>

            </>
          )}

          {user.login && (
            <>
             <Route element={<Navigate to={'/'} />} path={'/login'} />
             <Route element={<Navigate to={'/'} />} path={'/signup'} />
             <Route element={<Navigate to={'/'} />} path={'/forgotPassword'} />
              <Route element={<HomePage />} path="/" />
              <Route element={<ProfilePage />} path="/profile" />
              <Route element={<PlacePage/>} path={'/location'} />
              <Route element={<AddVehiclePage/>} path='/addvehicle'/>
              {/* <Route element={<StripeSample/>} path='/stripe'/> */}
              <Route element={<UserSchedulePage/>} path={'/schedule'}/>
              <Route element={<AppointmentSuccess/>} path={'/success'}/>
              <Route element={<UserBookingHistoryPage/>} path={'/booking'}/>
            </>
          )}
        <Route element={<ErrorPage/>} path={'*'} />        
        </Routes>

    </div>
  )
}

export default UserRoutes

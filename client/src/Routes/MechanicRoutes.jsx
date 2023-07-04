import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ForgotMechanicPage from '../Pages/ForgotMechanicPage';
import MechanicAppManagePage from '../Pages/MechanicAppManagePage';
import MechanicLoginPage from '../Pages/MechanicLoginPage';
import MechanicPaymentPage from '../Pages/MechanicPaymentPage';
import MechanicProfilePage from '../Pages/MechanicProfilePage';
import MechanicSchedulePage from '../Pages/MechanicSchedulePage';
import MechanicSignupPage from '../Pages/MechanicSignupPage';
import MechanicChatPage from '../Pages/MechanicChatPage/MechanicChatPage';
function MechanicRoutes() {
    const { refresh, mechanic } = useSelector((state) => state);
    const dispatch = useDispatch();
  
    useEffect(() => {  
      axios.get('/mechanic/auth').then((response) => {
        console.log("MECHANICS:", response.data);
        dispatch({ type: 'mechanic', payload: { mechLog: response.data.logged, details: response.data.details } });
      }).catch((error)=>{
        console.log(error);
      })
  
    }, [refresh, dispatch]);
  return (
    <div>
        <Routes>
          {mechanic.mechLog && (
            <>
              <Route element={<MechanicSchedulePage/>} path={'/schedule'}/>
              {/* <Route element={<MechanicDashboardPage />} path="/mechanic/dashboard" /> */}
              <Route element={<MechanicProfilePage/>} path={'/profile'} />
              <Route element={<MechanicPaymentPage/>} path={'/payment'}/>
              <Route element={<MechanicAppManagePage/>} path={'/appoinmentManage'}/>
              <Route element={<Navigate to={'/mechanic/schedule'} />} path="/login" />
              <Route element={<Navigate to={'/mechanic/schedule'} />} path="/signup" />
              <Route element={<Navigate to={'/mechanic/schedule'} />} path="/forgotMechanicPassword" />
              <Route element={<MechanicChatPage/>} path={'/chat'}/>


            </>
          )}

          {!mechanic.mechLog && (
            <>
              <Route element={<Navigate to={'/mechanic/login'} />} path="/dashboard" />
              <Route element={<Navigate to={'/mechanic/login'} />} path="/schedule" />
              <Route element={<Navigate to={'/mechanic/login'} />} path="/profile" />
              <Route element={<Navigate to={'/mechanic/login'} />} path="/payment" />
              <Route element={<Navigate to={'/mechanic/login'} />} path="/appoinmentManage" />
              <Route element={<Navigate to={'/mechanic/login'} />} path={'/chat'}/>

              <Route element={<MechanicLoginPage />} path="/login" />
              <Route element={<MechanicSignupPage />} path="/signup" />
              <Route element={<ForgotMechanicPage />} path="/forgotMechanicPassword" />
            </>
          )}
        </Routes>
    </div>
  )
}

export default MechanicRoutes

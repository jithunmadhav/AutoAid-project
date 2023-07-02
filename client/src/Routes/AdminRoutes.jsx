import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboardPage from '../Pages/AdminDashboardPage';
import AdminLoginPage from '../Pages/AdminLoginPage';
import MechanicManagementPage from '../Pages/MechanicManagementPage';
import PaymentMangementPage from '../Pages/PaymentMangementPage';
import ServiceManagementPage from '../Pages/ServiceManagementPage';
import UserManagementPage from '../Pages/UserManagementPage';
function AdminRoutes() {
    const { refresh,admin } = useSelector((state) => state);
    const dispatch = useDispatch();
  
    useEffect(() => {
      axios.get('/admin/auth').then((response) => {
        console.log("ADMIN: ", response.data);
        dispatch({ type: 'admin', payload: { adminLog: response.data.logged, details: response.data.details } });
      }).catch((error)=>{
        console.log(error);
      })  
    }, [refresh, dispatch]);
  return (
    <div>
        <Routes>
        {
            admin.adminLog===false && (
              <>
              <Route element={<AdminLoginPage />} path="/login" />
              <Route element={<Navigate to={'/admin/login'} />} path={'/dashboard'}/>
              <Route element={<Navigate to={'/admin/login'} />} path={'/usermanagement'} />
              <Route element={<Navigate to={'/admin/login'} />} path={'/mechanicmanagement'} />
              <Route element={<Navigate to={'/admin/login'} />} path={'/servicemanagement'} />
              <Route element={<Navigate to={'/admin/login'} />} path={'/paymentmanagement'} />
              </>
            )
          }
          {
            admin.adminLog && (
              <>
              <Route element={<Navigate to={'/admin/dashboard'} />} path="/login" />
              <Route element={<AdminDashboardPage/>} path={'/dashboard'}/>
              <Route element={<UserManagementPage/>} path={'/usermanagement'} />
              <Route element={<MechanicManagementPage/>} path={'/mechanicmanagement'} />
              <Route element={<ServiceManagementPage/>} path={'/servicemanagement'} />
              <Route element={<PaymentMangementPage/>} path={'/paymentmanagement'}/>
              </>
            )
          }
        </Routes>
    </div>
  )
}

export default AdminRoutes

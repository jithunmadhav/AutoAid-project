import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import UserLoginPage from './Pages/UserLoginPage';
import UserSignupPage from './Pages/UserSignupPage';
import MechanicLoginPage from './Pages/MechanicLoginPage';
import MechanicSignupPage from './Pages/MechanicSignupPage';
import AdminLoginPage from './Pages/AdminLoginPage';
import axios from './axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import ForgotMechanicPage from './Pages/ForgotMechanicPage';
import MechanicDashboardPage from './Pages/MechanicDashboardPage';
import MechanicProfilePage from './Pages/MechanicProfilePage';
import AdminDashboardPage from './Pages/AdminDashboardPage';
import UserManagementPage from './Pages/UserManagementPage';
import MechanicManagement from './Pages/MechanicManagementPage';
import ErrorPage from './Pages/ErrorPage';
import ServiceManagementPage from './Pages/ServiceManagementPage';
import PlacePage from './Pages/PlacePage';
import AddVehiclePage from './Pages/AddVehiclePage';
import StripeSample from './components/Sample/StripeSample';
import AppointmentSuccess from './components/AppoinmentSuccess/AppointmentSuccess';
import MechanicSchedulePage from './Pages/MechanicSchedulePage';
import UserSchedulePage from './Pages/UserSchedulePage';
import MechanicAppManagePage from './Pages/MechanicAppManagePage';
import MechanicPaymentPage from './Pages/MechanicPaymentPage';
import PaymentMangementPage from './Pages/PaymentMangementPage';
import UserBookingHistoryPage from './Pages/UserBookingHistoryPage';

function App() {
  const { user, refresh, mechanic,admin } = useSelector((state) => state);
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/admin/auth').then((response) => {
      console.log("ADMIN: ", response.data);
      dispatch({ type: 'admin', payload: { adminLog: response.data.logged, details: response.data.details } });
    });

    axios.get('/user/auth/').then((response) => {
      console.log("USER:", response.data);
      dispatch({ type: 'user', payload: { login: response.data.logged, details: response.data.details } });
    });

    axios.get('/mechanic/auth').then((response) => {
      console.log("MECHANICS:", response.data);
      dispatch({ type: 'mechanic', payload: { mechLog: response.data.logged, details: response.data.details } });
    });
  }, [refresh, dispatch]);
  return (
    <div>
      <Router>
        <Routes>
          {
            <Route element={<ErrorPage/>} path={'*'} />
          }
        {
            admin.adminLog===false && (
              <>
              <Route element={<AdminLoginPage />} path="/admin/login" />
              <Route element={<Navigate to={'/admin/login'} />} path={'/admin/dashboard'}/>
              <Route element={<Navigate to={'/admin/login'} />} path={'/admin/usermanagement'} />
              <Route element={<Navigate to={'/admin/login'} />} path={'/admin/mechanicmanagement'} />
              <Route element={<Navigate to={'/admin/login'} />} path={'/admin/servicemanagement'} />
              <Route element={<Navigate to={'/admin/login'} />} path={'/admin/paymentmanagement'} />
              </>
            )
          }
          {
            admin.adminLog && (
              <>
              <Route element={<Navigate to={'/admin/dashboard'} />} path="/admin/login" />
              <Route element={<AdminDashboardPage/>} path={'/admin/dashboard'}/>
              <Route element={<UserManagementPage/>} path={'/admin/usermanagement'} />
              <Route element={<MechanicManagement/>} path={'/admin/mechanicmanagement'} />
              <Route element={<ServiceManagementPage/>} path={'/admin/servicemanagement'} />
              <Route element={<PaymentMangementPage/>} path={'/admin/paymentmanagement'}/>
              </>
            )
          }
          {user.login === false && (
            <>
              <Route element={<UserLoginPage />} path="/user/login" />
              <Route element={<UserSignupPage />} path="/user/signup" />
              <Route element={<HomePage />} path="/" />
              <Route element={<ForgotPasswordPage />} path={"/forgotPassword"}/>
              <Route element={<Navigate to={'/user/login'} />} path="/user/profile" />
              <Route element={<Navigate to={'/user/login'} />} path={'/location'} />
              <Route element={<Navigate to={'/user/login'} />} path='/addvehicle'/>
              <Route element={<Navigate to={'/user/login'} />} path='/success'/>

            </>
          )}

          {user.login && (
            <>
             <Route element={<Navigate to={'/'} />} path={'/user/login'} />
             <Route element={<Navigate to={'/'} />} path={'/user/signup'} />
             <Route element={<Navigate to={'/'} />} path={'/forgotPassword'} />
              <Route element={<HomePage />} path="/" />
              <Route element={<ProfilePage />} path="/user/profile" />
              <Route element={<PlacePage/>} path={'/location'} />
              <Route element={<AddVehiclePage/>} path='/addvehicle'/>
              <Route element={<StripeSample/>} path='/stripe'/>
              <Route element={<UserSchedulePage/>} path={'/user/schedule'}/>
              <Route element={<AppointmentSuccess/>} path={'/success'}/>
              <Route element={<UserBookingHistoryPage/>} path={'/user/history'}/>
            </>
          )}

          {mechanic.mechLog && (
            <>
              <Route element={<MechanicSchedulePage/>} path={'/mechanic/schedule'}/>
              {/* <Route element={<MechanicDashboardPage />} path="/mechanic/dashboard" /> */}
              <Route element={<MechanicProfilePage/>} path={'/mechanic/profile'} />
              <Route element={<MechanicPaymentPage/>} path={'/mechanic/payment'}/>
              <Route element={<MechanicAppManagePage/>} path={'/mechanic/appoinmentManage'}/>
              <Route element={<Navigate to={'/mechanic/schedule'} />} path="/mechanic/login" />
              <Route element={<Navigate to={'/mechanic/schedule'} />} path="/mechanic/signup" />
              <Route element={<Navigate to={'/mechanic/schedule'} />} path="/forgotMechanicPassword" />



            </>
          )}

          {!mechanic.mechLog && (
            <>
              <Route element={<Navigate to={'/mechanic/login'} />} path="/mechanic/dashboard" />
              <Route element={<Navigate to={'/mechanic/login'} />} path="/mechanic/schedule" />
              <Route element={<Navigate to={'/mechanic/login'} />} path="/mechanic/profile" />
              <Route element={<Navigate to={'/mechanic/login'} />} path="/mechanic/payment" />
              <Route element={<Navigate to={'/mechanic/login'} />} path="/mechanic/appoinmentManage" />
              <Route element={<MechanicLoginPage />} path="/mechanic/login" />
              <Route element={<MechanicSignupPage />} path="/mechanic/signup" />
              <Route element={<ForgotMechanicPage />} path="/forgotMechanicPassword" />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

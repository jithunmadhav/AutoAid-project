import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
 
import axios from './axios';
import UserRoutes from './Routes/UserRoutes';
import MechanicRoutes from './Routes/MechanicRoutes';
import AdminRoutes from './Routes/AdminRoutes';
 

function App() {

  axios.defaults.withCredentials = true;
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<UserRoutes/>} path={'/*'}/>   
          <Route element={<MechanicRoutes/>} path={'/mechanic/*'}/>          
          <Route element={<AdminRoutes/>} path={'/admin/*'}/>          
        </Routes>
      </Router>
    </div>
  );
}

export default App;

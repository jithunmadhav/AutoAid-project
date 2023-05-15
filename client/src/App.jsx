import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserLoginPage from './Pages/UserLoginPage';
import UserSignupPage from './Pages/UserSignupPage';
import MechanicLoginPage from './Pages/MechanicLoginPage';
import MechanicSignupPage from './Pages/MechanicSignupPage';
import MechanicSignupPage2 from './Pages/MechanicSignupPage2';
import AdminLoginPage from './Pages/AdminLoginPage';
import axios from './axios'


function App() {
  axios.defaults.withCredentials = true;
  return (
    <div >
     <Router>
      <Routes>
        <Route  element={<UserLoginPage/> } path='/user/login' />
        <Route  element={<UserSignupPage/>} path='/user/signup'/>
        <Route  element={<AdminLoginPage/>} path='/admin/login' />
        <Route  element={<MechanicLoginPage/> } path='/mechanic/login' />
        <Route  element={<MechanicSignupPage/> } path='/mechanic/signup' />
        <Route  element={<MechanicSignupPage2/>} path='mechanic/signup/next' />

      </Routes>
     </Router>
    </div>
  );
}

export default App;

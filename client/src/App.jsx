import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserLoginPage from './Pages/UserLoginPage';
import UserSignupPage from './Pages/UserSignupPage';
import MechanicLoginPage from './Pages/MechanicLoginPage';
import MechanicSignupPage from './Pages/MechanicSignupPage';
import MechanicSignupPage2 from './Pages/MechanicSignupPage2';
import AdminLoginPage from './Pages/AdminLoginPage';
import axios from './axios'
import { useEffect } from 'react';
import PlaceAPI from './components/PlaceAPI/PlaceAPI';
import Home from './components/HomePage/Home';


function App() {
  useEffect(() => {
    axios.get('/admin/auth').then((response)=>{
      console.log(response.data);
    })
    axios.get('/user/auth').then((response)=>{
      console.log(response.data);
    })

  }, [])
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
        <Route  element={<MechanicSignupPage2/>} path='/mechanic/signup/next' />
        <Route  element={<PlaceAPI/>} path='place' />
        <Route element={<Home/>} path='/' />

      </Routes>
     </Router>
    </div>
  ); 
}
 
export default App;

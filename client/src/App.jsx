import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import UserLoginPage from './Pages/UserLoginPage';
import UserSignupPage from './Pages/UserSignupPage';
import MechanicLoginPage from './Pages/MechanicLoginPage';
import MechanicSignupPage from './Pages/MechanicSignupPage';
import MechanicSignupPage2 from './Pages/MechanicSignupPage2';
import AdminLoginPage from './Pages/AdminLoginPage';
import axios from './axios'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import PlaceAPI from './components/PlaceAPI/PlaceAPI';
import HomePage from './Pages/HomePage';


function App() {
  const {user,admin,refresh}=useSelector((state)=>{
    return state
   });
   const dispatch = useDispatch()
   axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('/admin/auth').then((response)=>{
      console.log("ADMIN : ",response.data);
      dispatch({type:'admin',payload:{adminLog:response.data.logged,details:response.data.details}})

    })
    axios.get('/user/auth').then((response)=>{
      console.log("USER :",response.data);
      dispatch({type:'user',payload:{login: response.data.logged,details:response.data.details}});

    })

  }, [refresh])
  return (
    <div >
     <Router>
      {user.login===false &&
      <Routes>
        <Route  element={<UserLoginPage/> } path='/user/login' />
        <Route  element={<UserSignupPage/>} path='/user/signup'/>
        <Route  element={<AdminLoginPage/>} path='/admin/login' />
        <Route  element={<MechanicLoginPage/> } path='/mechanic/login' />
        <Route  element={<MechanicSignupPage/> } path='/mechanic/signup' />
        <Route  element={<MechanicSignupPage2/>} path='/mechanic/signup/next' />
        <Route  element={<PlaceAPI/>} path='/place' />
        <Route element={<HomePage/>} path='/' />
     

      </Routes>
      }
        {user.login===true &&
      <Routes>
        <Route  element={<Navigate to={'/'}/> } path='/user/login' />
        <Route  element={<Navigate to={'/'}/>} path='/user/signup'/>
        <Route  element={<AdminLoginPage/>} path='/admin/login' />
        <Route  element={<MechanicLoginPage/> } path='/mechanic/login' />
        <Route  element={<MechanicSignupPage/> } path='/mechanic/signup' />
        <Route  element={<MechanicSignupPage2/>} path='/mechanic/signup/next' />
        <Route  element={<PlaceAPI/>} path='/place' />
        <Route element={<HomePage/>} path='/' />
     

      </Routes>
      }
     </Router>
    </div>
  ); 
}
 
export default App;

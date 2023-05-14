import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserLoginPage from './Pages/UserLoginPage';
import UserSignupPage from './Pages/UserSignupPage';
import MechanicLoginPage from './Pages/MechanicLoginPage';
import MechanicSignupPage from './Pages/MechanicSignupPage';


function App() {
  return (
    <div >
     <Router>
      <Routes>
        <Route  element={<UserLoginPage/> } path='/userLogin' />
        <Route  element={<UserSignupPage/>} path='/userSignup'/>
        {/* <Route  element={<AdminLogin/>} path='/adminLogin' /> */}
        <Route  element={<MechanicLoginPage/> } path='/mechanicLogin' />
        <Route  element={<MechanicSignupPage/> } path='/mechanicSignup' />
        {/* <Route element={<MecahnicSignup2/>} path='mechanicSignup/next' /> */}

      </Routes>
     </Router>
    </div>
  );
}

export default App;

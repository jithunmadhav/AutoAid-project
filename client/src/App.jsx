import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserLogin from './components/UserLogin/UserLogin';
import AdminLogin from './components/AdminLogin/AdminLogin';
import MechanicLogin from './components/MechanicLogin/MechanicLogin';
import UserSignup from './components/UserSignup/UserSignup';
import MechanicSignup from './components/MechanicSignup/MechanicSignup';
import MecahnicSignup2 from './components/MechanicSignup/MecahnicSignup2';

function App() {
  return (
    <div >
     <Router>
      <Routes>
        <Route  element={<UserLogin/> } path='/userLogin' />
        <Route  element={<UserSignup/>} path='/userSignup'/>
        <Route  element={<AdminLogin/>} path='/adminLogin' />
        <Route  element={<MechanicLogin/> } path='/mechanicLogin' />
        <Route  element={<MechanicSignup/> } path='/mechanicSignup' />
        <Route element={<MecahnicSignup2/>} path='mechanicSignup/next' />

      </Routes>
     </Router>
    </div>
  );
}

export default App;

import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserLogin from './components/UserLogin/UserLogin';
import AdminLogin from './components/AdminLogin/AdminLogin';
import MechanicLogin from './components/MechanicLogin/MechanicLogin';
import UserSignup from './components/UserSignup/UserSignup';

function App() {
  return (
    <div >
     <Router>
      <Routes>
        <Route  element={<UserLogin/> } path='/userLogin' />
        <Route  element={<UserSignup/>} path='/userSignup'/>
        <Route  element={<AdminLogin/>} path='/adminLogin' />
        <Route  element={<MechanicLogin/> } path='/mechanicLogin' />
      </Routes>
     </Router>
    </div>
  );
}

export default App;

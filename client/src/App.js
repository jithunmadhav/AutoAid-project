import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserLogin from './components/UserLogin/UserLogin';
import AdminLogin from './components/AdminLogin/AdminLogin';
import MechanicLogin from './components/MechanicLogin/MechanicLogin';

function App() {
  return (
    <div >
     <Router>
      <Routes>
        <Route path='/userLogin' element={<UserLogin/> } />
        <Route path='/adminLogin' element={<AdminLogin/> } />
        <Route path='/mechanicLogin' element={<MechanicLogin/> } />
      </Routes>
     </Router>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import PatientDetailsPage from './pages/PatientDetailsPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { jwtDecode } from 'jwt-decode';
import NavBase from './components/NavBase';

function App() {
  const token = localStorage.getItem("token");
  const role = token ? jwtDecode(token).role : null;
  return (
    <Router>
      <NavBase role={role}/>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/patient/:id' element={<PatientDetailsPage />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

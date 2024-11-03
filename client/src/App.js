import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import PatientDetailsPage from './pages/PatientDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<>hello</>} />
        <Route path='/patient/:id' element={<PatientDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

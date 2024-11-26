import React from 'react';
import AdminDashboard from './AdminDashboard';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard.jsx';
import {jwtDecode} from 'jwt-decode';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const role = token ? jwtDecode(token).role : null;
  const id = token ? jwtDecode(token)._id : null;
  
  return (
    <div>
      {role === 'admin' && <AdminDashboard />}
      {role === 'doctor' && <DoctorDashboard />}
      {role === 'patient' && <PatientDashboard pId={id}/>}
      {!role && <p>You need to log in to access the dashboard.</p>}
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbase.css';

const NavBase = ({ role }) => {
  const links = {
    admin: [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/users', label: 'Manage Users' },
      { path: '/reports', label: 'Reports' },
    ],
    doctor: [
      { path: '/appointments', label: 'Appointments' },
      { path: '/patients', label: 'Patients' },
      { path: '/profile', label: 'Profile' },
    ],
    patient: [
      { path: '/my-appointments', label: 'My Appointments' },
      { path: '/profile', label: 'Profile' },
    ],
  };

  const defaultLinks = [
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Register' },
  ];

  return (
    <nav className="glass-navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">HealthCare+</Link>
        </div>
        <ul className="navbar-links">
          {(role ? links[role] : defaultLinks).map((link) => (
            <li key={link.path}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBase;

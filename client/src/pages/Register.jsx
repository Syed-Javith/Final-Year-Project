import React, { useState } from 'react';
import axios from 'axios';
import '../css/register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { 
        username, 
        password, 
        role 
      });
      setMessage('Registration successful, please log in.');
      setUsername('');
      setPassword('');
      setRole('patient');
    } catch (err) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {message && <p className="message">{message}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <select onChange={(e) => setRole(e.target.value)} value={role} className="register-select">
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="register-button">Register</button>
      </form>
      <p>Existing user ? <Link to={'/'}>login</Link></p>
    </div>
  );
};

export default Register;

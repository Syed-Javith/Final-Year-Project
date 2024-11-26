import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      const decoded = jwtDecode(res.data.token);
      setRole(decoded.role);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token != null && token != undefined && token != 'undefined' && token.length>0) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        {role && <p className="role-info">Logged in as: <strong>{role}</strong></p>}
      </div>
      <p>New user ? <Link to={'register'}>register</Link></p>
    </div>
  );
};

export default Login;

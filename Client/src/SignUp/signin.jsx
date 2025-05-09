import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/SignIn/signin.css';
import Server_Ip from '../config';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post(`${Server_Ip}/login`, { email, password })
      .then(response => {
        localStorage.setItem('userId', response.data.user.id);
        alert('Login successful');
        navigate('/dashboard');
      })
      .catch(error => {
        console.error(error);
        alert('Login failed');
      });
  };

  return (
    <div className="box">
      <h1 className="title">Sign In</h1>
      <div className="innerbox">
        <input
          type="email"
          placeholder="Email"
          className="loginput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="loginput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signin" onClick={handleLogin}>
          Sign In
        </button>
        <h3 className="register">
          Don't have an account? <a href="/register"><span className="registertext">Register Now</span></a>
        </h3>
      </div>
    </div>
  );
}

export default SignIn;

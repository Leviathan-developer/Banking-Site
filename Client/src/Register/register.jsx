import React, { useState } from 'react';
import '../assets/css/Register/register.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons"
import {faEyeSlash} from "@fortawesome/free-regular-svg-icons"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Server_Ip from '../config';

function SignUp() {
  const [checkboxState2, setCheckbox2] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [Name, setName] = useState('')
  const [Password, setPassword] = useState('')
  const [Email, setEmail] = useState('')

  const handelEmail = (e) =>{
    setEmail(e.target.value);
  };
  const handelPassword = (e) =>{
    setPassword(e.target.value);
  };
  const handelName = (e) =>{
    setName(e.target.value);
  };
function handleSignUp() {
  if (Name === '' || Email === '' || Password === '') {
    alert('Please complete the form');
    return;
  }  
  if (!checkboxState2) {
    alert('You need to agree terms to use');
  } else {
      axios.post(`${Server_Ip}/register`, {
        name: Name,
        email: Email,
        password: Password
      })
          .then(response => {
        alert("Registration successful!");
        navigate('/dashboard');
      })
      .catch(error => {
        console.error(error);
      });
  }
}
  

  const handleCheckbox2 = () => setCheckbox2(!checkboxState2);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className='box'>
      <h1 className="title">Sign Up</h1>
      <div className="innerbox">
        <input type='text' placeholder='Name' className='loginput' onChange={handelName}/>
        <input type='email' placeholder='Email' className='loginput' onChange={handelEmail}/>
        <div className="passwordblock">
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='loginput'
              onChange={handelPassword}
            />
            <span
              className="eye-icon"
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer', position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)' }}
            >
              {showPassword ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/>}
            </span>
          </div>
        </div>
        <div className="checkboxgroups">
          <label className="check">
            <div className="sad">
              <input
              type='checkbox'
              className='notthisone'
              checked={checkboxState2}
              onChange={handleCheckbox2}
            />
            </div>
            
            <span>
              <span className="condition">By signing up, I agree to Bank's</span>
              <span className="bluetext"> Terms & Conditions </span> <span className='condition'>and</span>
              <span className="bluetext"> Privacy Policy</span>
            </span>
          </label>
        </div>
        <button className="signin" onClick={handleSignUp}>Sign Up</button>
        <h3 className="register">
          Already have an account? <a href="/signup"><span className="bluetext">Sign in</span></a>
        </h3>
      </div>
    </div>
  );
}

export default SignUp;
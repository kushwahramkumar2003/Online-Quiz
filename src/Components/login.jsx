import React, { useState } from 'react';
import cap from './Images/graduate.svg';
import logo from './Images/logo.svg';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" /> 

export default function Login() {
  const textD = {
    textDecoration: 'none',
    color: 'black',
  };

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = (e) => {
    if (e.target.value === '') {
      setMessage('Please enter your password');
    } else {
      setMessage('');
    }
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call here
      const response = await fetch('http://localhost:3001/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // Handle the API response
      if (response.ok) {
        setMessage('Login successful!');
        // You can also redirect the user or perform other actions based on a successful login
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Error connecting to the server. Please try again.');
    }
  };

  return (
    <div className='main'>
      <div className='Left-content'>
        <nav>
          <img src={logo} alt='Logo' id='log1'></img>
        </nav>

        <p id='head'>
          <span> Welcome back! </span>
          <br />
          <span> Please login/Signup to your account. </span>
        </p>

        <form action='/login' method='post'>
          <div className='form-details'>
            <form>
              <label>
                <input
                  type='email'
                  value={email}
                  onChange={handleEmailChange}
                  placeholder='Email Address'
                  className='input-same'
                />
              </label>

              <label>
                <div className='password-input'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePassword}
                    placeholder='Password'
                    className='input-same'
                  />
                  <span className='password-toggle' onClick={handlePasswordVisibility}>
                    {showPassword ? <i className='far fa-eye-slash'></i> : <i className='far fa-eye'></i>}
                  </span>
                </div>
              </label>
            </form>

            {message && <p>{message}</p>}
          </div>

          <div className='forget-pass'>
            <a href='/fogrt' target='_blank' rel='noopener noreferrer' style={textD} id='forget'>
              Forgot Password?{' '}
            </a>
          </div>

          <div className='btns' style={{}}>
            <button type='submit' onClick={handleSubmit}>Login</button>
            <button type='submit'>
              <Link className='link' to='/SignUp'>
                SignUp
              </Link>
              
            </button>
           
          </div>
          <Link className='Quiz' to='/Quiz'>
                Quiz
              </Link>
          <div className='another-Login'>
            <p> Or Login with </p>
            <p className='same-lo'>Google</p>
            <p className='same-lo'>Facebook</p>
          </div>
          <div className='changing-status'>
            <p>Your have not any account</p>
          </div>
        </form>
      </div>

      <div className='right-img'>
        <img src={cap} alt='Cap'></img>
      </div>
    </div>
  );
}

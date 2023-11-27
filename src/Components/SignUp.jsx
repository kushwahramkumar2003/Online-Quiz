import React, { useState } from 'react';
import cap from './Images/graduate.svg';
import logo from './Images/logo.svg';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const textD = {
    textDecoration: 'none',
    color: 'black',
  };
  const [name, setName] = useState('');
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
 
  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Reached Here");
      // Make API call to register the user
      const response = await fetch('http://localhost:3001/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,email, password }),
        
      });
      console.log(response);

      if (response.ok) {
        setMessage('User registered successfully!');
      } else {
        setMessage('Error registering user. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='main'>
      <div className='Left-content'>
        <nav>
          <img src={logo} alt='Logo' id='log1' />
        </nav>

        <p id='head'>
          <span> Welcome back! </span>
          <br />
          <span> Please login/Signup to your account. </span>
        </p>

        <form>
          <div className='form-details'>
            <label>
            <input
                type='name'
                value={name}
                onChange={handleNameChange}
                placeholder='Enter you name'
              />
              <input
                type='email'
                value={email}
                onChange={handleEmailChange}
                placeholder='Email Address'
              />
            </label>

            <label>
              <div className='password-input'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePassword}
                  placeholder='Password'
                />
                <span className='password-toggle' onClick={handlePasswordVisibility}>
                  {showPassword ? <i className='far fa-eye-slash'></i> : <i className='far fa-eye'></i>}
                </span>
              </div>
            </label>

            {message && <p>{message}</p>}
          </div>

          <div className='forget-pass'>
            <Link to='/forgot' style={textD} id='forget'>
              Forgot Password?
            </Link>
          </div>

          <div className='btns'>
            <button type='submit'>Login</button>
            <button type='submit' onClick={handleSubmit}>SignUp</button>
          </div>

          <div className='changing-status'>
  <p>Your have already account</p>
  <Link to='/'>redirect SignUp</Link>
</div>

          <div className='another-Login'>
            <p> Or Login with </p>
            <p className='same-lo'>Google</p>
            <p className='same-lo'>Facebook</p>
          </div>
        </form>
      </div>

      <div className='right-img'>
        <img src={cap} alt='Cap' />
      </div>
    </div>
  );
}


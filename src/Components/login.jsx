import React, { useState } from 'react';
import cap from './Images/graduate.svg';
import logo from './Images/logo.svg';
import './Login.css';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" /> 


export default function Login() {
    const textD = {
        textDecoration: 'none', 
        color: 'black', 
    }
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');

  // **************************
  const [showPassword, setShowPassword] = useState(false);
  // **************************

  const handlePassword = (e) =>{
    if(e.target.value === ''){
      setMessage("Please enter your password");
    }else{
        setMessage('')
    }
    setPassword(e.target.value);
  };
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  

  // **************************
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //*************************** 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setMessage('Error sending password reset email. Please try again.');
    }
  };

  return (
    <div className='main'>
      
      <div className='Left-content'>
        {/* <img src={cap} alt="Cap"></img> */}
      
      <nav>
        <img src={logo} alt="Logo" id='log1'></img>
      </nav>
        
        <p id='head'>
          <span> Welcome  back! </span>
          <br/>
          <span> Please login/Signup to your account. </span>
        </p>

        
  <form action='/login' method='post'>
          <div className='form-details'>
            <form onSubmit={handleSubmit}>
              <label>
                {/* Email: */}
                <input
                  type='email'
                  value={email}
                  onChange={handleEmailChange}
                  placeholder='Email Address' className='input-same'/>
    </label>


 {/* *********** Eye Icon ************ */}
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
      {showPassword ? (
        <i className='far fa-eye-slash'></i>
      ) : (
        <i className='far fa-eye'></i>
      )}
     </span>
    </div>
  </label>
</form>
    
    {message && <p>{message}</p>}
  </div>

  <div className='forget-pass'>
    <a href='/fogrt' target='_blank' rel='noopener noreferrer' style={textD} id='forget'>
    Forgot Password? </a>
  </div>


  {/****** Login and SignUp Buttons ******/}
  <div className='btns' style={{}}>
      <button type='submit'>Login</button>
      <button type='submit'>SignUp</button>
  </div>


  {/* Login with another  */}
  <div className='another-Login'>
    <p> Or Login with </p>
    <p className='same-lo'>Google</p>
    <p className='same-lo'>Facebook</p>
  </div>

    </form>
  </div>


  


  <div className='right-img'>
    <img src={cap} alt="Cap"></img>
    </div>
  </div>
  );
}

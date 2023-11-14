import React, { useState } from 'react';
import cap from './Images/graduate.svg';
import logo from './Images/logo.svg';


export default function Login() {
    const textD = {
        textDecoration: 'none', 
        color: 'black', 
    }
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setMessage('Error sending password reset email. Please try again.');
    }
  };

  return (
    <div>
      <div className='upHeading'>
        <img src={logo} alt="Logo"></img>
        <p>
          <span>Welcom back !</span>
          <br />
          <span>Please login or SignUp your account</span>
        </p>
      </div>
      <div>
        <img src={cap} alt="Cap"></img>
        <form action="/login" method="post">
         
          <div>
           
            <form onSubmit={handleSubmit}>
              <label>
                Email:
                <input type="email" value={email} onChange={handleEmailChange} />
              </label>
              <label>
                Password:
                <input type="password" value={password} onChange={handlePassword} />
              </label>
              <a href="/fogrt" target="_blank" rel="noopener noreferrer" style={textD}>
        Forget Password
      </a>
            </form>
            {message && <p>{message}</p>}
          </div>
          <div className='btns' style={{}}>
            <button type="submit">Login</button>
            <button type="submit">SignUp</button>
          </div>
        </form>
      </div>
    </div>
  );
}

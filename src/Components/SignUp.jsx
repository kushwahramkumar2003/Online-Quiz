import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('http://localhost:3001/api/v1/auth/register', {
        name,
        username,
        password,
      });

      
      console.log('Sign-up successful:', response.data);
    } catch (error) {
     
      console.error('Sign-up failed:', error.message);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;

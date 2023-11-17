// import React, { useState,useEffect } from 'react';
// import cap from './Images/graduate.svg';
// import logo from './Images/logo.svg';
// import axios from 'axios';
// // import {Link} from "react-router-dom"
// import { useNavigate, Link } from "react-router-dom"


// export default function Login() {

    

//   useEffect(() => {
//     fetch('http://localhost:3001/api/v1/auth/login')
//         .then(response => response.json())
//         .then(json => console.log(json))
// }, []);

//   const textD = {
//         textDecoration: 'none', 
//         color: 'black', 
//     }
//   const  history = useNavigate();
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [password, setPassword] = useState('');

//   async function Submit(e){
//     e.preventDefault();
  

//   }  

//   const handlePassword = (e) =>{
//     if(e.target.value === ''){
//       setMessage("Please enter your password");
//     }else{
//         setMessage('')
//     }
//     setPassword(e.target.value);
//   };
  

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setMessage('Password reset email sent. Please check your inbox.');
//     } catch (error) {
//       setMessage('Error sending password reset email. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <div className='upHeading'>
//         <img src={logo} alt="Logo"></img>
//         <p>
//           <span>Welcom back !</span>
//           <br />
//           <span>Please login or SignUp your account</span>
//         </p>
//       </div>
//       <div>
//         <img src={cap} alt="Cap"></img>
//         <form action="/login" method="post">
         
//           <div>
           
//             <form onSubmit={handleSubmit}>
//               <label>
//                 Email:
//                 <input type="email" value={email} onChange={handleEmailChange} />
//               </label>
//               <label>
//                 Password:
//                 <input type="password" value={password} onChange={handlePassword} />
//               </label>
//               <a href="/fogrt" target="_blank" rel="noopener noreferrer" style={textD}>
//         Forget Password
//       </a>
//             </form>
//             {message && <p>{message}</p>}
//           </div>
//           <div className='btns' style={{}}>
//             <button type="submit" onClick={Submit}>Login</button>
//             <button type="submit" href="/SignUp" >SignUp</button>
//             <Link to="/SignUp">SignUp</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }







// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { useNavigate, Link } from "react-router-dom"


// function Login() {

//     const history=useNavigate();

//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')

//     async function submit(e){
//         e.preventDefault();

//         try{

//             await axios.post("http://localhost:8000/",{
//                 email,password
//             })
//             .then(res=>{
//                 if(res.data=="exist"){
//                     history("/home",{state:{id:email}})
//                 }
//                 else if(res.data==="notexist"){
//                     alert("User have not sign up")
//                 }
//             })
//             .catch(e=>{
//                 alert("wrong details")
//                 console.log(e);
//             })

//         }
//         catch(e){
//             console.log(e);

//         }

//     }


//     return (
//         <div className="login">

//             <h1>Login</h1>

//             <form action="POST">
//                 <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
//                 <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
//                 <input type="submit" onClick={submit} />

//             </form>

//             <br />
//             <p>OR</p>
//             <br />

//             <Link to="/Signup">Signup Page</Link>

//         </div>
//     )
// }

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/v1/auth/login', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;


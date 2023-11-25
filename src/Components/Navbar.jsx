import React from 'react';
import  capLogo  from './Images/logo.svg'
import rightimg from './Images/Right-img.svg'
import {Link} from 'react-router-dom';
import './navbar.css'

const menuLinks = [
  { name: "How it works", link: "#works" },
  { name: "Features", link: "#features" },
  { name: "About Us", link: "#about" },
  { name: "Login", link: "#loginpage" },
];
const Navbar = () => {
  return (
    <> 
    
      <nav>
      <div className="flex items-center justify-between">
        <div className="mx-7">
        <img src={capLogo} ></img>
          
        </div>
        <div>
          <ul className="flex items-center gap-1 py-2 text-lg">
            {menuLinks?.map((menu, i) => (
              <li key={i} className="px-6 hover:text-[#FCC822]">
                <a href={menu?.link}>{menu?.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div
         
        >
         
        </div>
        <div>
         
        </div>
      </div>
    </nav>
    <div className='main'>
    <div className='container'>

      <h4 className="text-4xl font-bold">
           Learn <span className="text-cyan-600">
           <br/></span>
            <span>New concepts
           </span><br/>
           for each question
          </h4>
          <p>We help you prepare for exams and quizes</p>
          <div className='Btn-container'>
         <button className='mt-8 w-28 h-12 bg-[#FCC822]'>Start Solving</button>
          <img src={rightimg}></img>
        

          </div>
    </div>
    <Link to="/login">Go to Login</Link>
    </div>
  </>
  );
}

export default Navbar;

import React from 'react';
import capLogo from './Images/logo.svg'
import rightimg from './Images/Right-img.svg'
import { Link } from 'react-router-dom';
import './navbar.css'

const menuLinks = [
  { name: "How it works", link: "#works" },
  { name: "Features", link: "#features" },
  { name: "About Us", link: "#about" },
  { name: "Login", link: "#loginpage" },
];
// navbar star here
const Navbar = () => {
  return (
    <>

      <nav>
        <div className="flex items-center justify-between" id='nav1'>
          <div className=" mx-7" id="logo1">
            <img src={capLogo} ></img>
          </div>

          <div>
            <ul className="flex items-center gap-1 py-2 text-lg" id='navbar1'>
              {menuLinks?.map((menu, i) => (
                <li key={i} className="px-6 hover:text-[#FCC822]" id='links1'>
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
      {/* navbar end here */}

      <div className='line'></div>
      <div className='main'>

        <div className='container'>
          <h4 className="text-4xl font-bold" id='text1'>
            Learn <span className="text-cyan-600" >
              <br /></span>
            <span>New concepts
            </span><br />
            for each question
          </h4>
          <p id='text2'>We help you prepare for exams and quizes</p>

          <button className='mt-8 w-28 h-12 bg-[#FCC822]' id='startbt'>Start Solving</button>

        </div>

        <div className="homeimg">
          <img src={rightimg} id='homeImage'></img>
        </div>

        <Link to="/login">Go to Login</Link>
      </div>

    </>
  );
}

export default Navbar;

import React from 'react';
import capLogo from './Images/logo.svg'
import rightimg from './Images/Right-img.svg'
import { Link } from 'react-router-dom';  

// import cornerD from './Images/icons/leftcorner-design.svg'
import fb from './Images/icons/facebook.svg'
import ld from './Images/icons/linkedin.svg' 
import  insta from './Images/icons/square-instagram.svg' 
import email from './Images/icons/email-mesage.svg' 
import phone from './Images/icons/phone-call.svg' 
import  location from './Images/icons/location.svg' 
import  twitter from './Images/icons/twitter.svg'
import './navbar.css'

const menuLinks = [
  { name: "How it works", link: "#works" },
  { name: "Features", link: "#features" },
  { name: "About Us", link: "#about" },
  { name: "Login", link: "#loginpage" },
];
// navbar start here
const Navbar = () => {
  return (
    <>

{/***************** Page 1 start here ******************/}

<div className="landinpage">
      <nav>
        <div className="flex items-center justify-between" id='nav1'>
          <div className="mx-7" id="logo1">
            <img src={capLogo} ></img>
          </div>

          <div className='navbartop'>
            <ul className="flex items-center gap-1 py-2 text-base" id='navbar1'>
              {menuLinks?.map((menu, i) => (
                <li key={i} className="px-6 hover:text-[#FCC822]" id='links1'>
                  <a href={menu?.link}>{menu?.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
        </div>

          {/* <div>
          </div> */}
        </div>
      </nav>

      {/************** Navbar end here *********************/}
      <div className='line'></div>



      {/************** Main Content here *********************/}
    
    <div className='main'>

        <div className='container'>
          <h4 className="text-4xl font-bold" id='text1'>
            Learn <span className="text-cyan-600" >
              <br /></span>
            <span>new concepts
            </span><br />
            for each question
            </h4>

          <p id='text2'>We help you prepare for exams and quizes</p>

          <button className='mt-8 w-28 h-12 ' id='startbt'>Start solving</button>
        </div>

        <div className="home-img">
          <img src={rightimg} id='homeImage'></img>
        </div>

    </div> 

</div>   
        

       <Link to="/login" id='go-to-login'>Go to Login</Link>
         <div className="line2"></div>
   
    
{/***************** How it wokrs page **********************************/}

       <div className='how-it-work'>
          <h2>How does it works?</h2> 
       </div>

    <section class="work">
        <div class="grid_item">
            <div class="card">
                
                <div class="card_content"> 
                    <h2>Sign Up/Login</h2>
                    <p>
                      Begin by creating a quick account to unlock personalized features.
                    </p>
                </div>

            </div>
        </div>

        <div class="grid_item">

            <div class="card">        
                <div class="card_content"> 
                    <h2>Start Playing</h2>
                    <p>With an account, start solving quizzes instantly.</p>
                </div>

            </div>

        </div>

        <div class="grid_item">

            <div class="card">
                <div class="image_container">
                </div>

                <div class="card_content"> 
                    <h2>Compete and Track</h2>
                    <p> Challenge others, check your rank on leaderboards, and aim for the top spot.</p>
                </div>

            </div>
        </div>

        <div class="grid_item">

            <div class="card">
                <div class="image_container">
                </div>

                <div class="card_content"> 
                    <h2>Cross-Platform Accessibility</h2>
                    <p> Whether on mobile, tablet, or desktop, our quizzes are designed for a consistent and enjoyable experience.</p>
                </div>

               
            </div>
        </div>
    </section>

     
   {/************** feature start here *******************/}  

   <div className='how-it-work'>
   <h2>Our features & Services</h2>
   </div> 

  <section class="work">
    <div class="grid_item">
        <div class="card">
            
            <div class="card_content"> 
                <h2>Programming Language Quizzes</h2>
                <p>
                  Begin by creating a quick account to unlock personalized features.
                </p>
            </div>

        </div>
    </div>

    <div class="grid_item">
        <div class="card">
         
            <div class="card_content"> 
                <h2>Start Playing</h2>
                <p>With an account, start solving quizzes instantly.</p>
            </div>

        </div>
    </div>

    <div class="grid_item">

        <div class="card">
            <div class="image_container">
            </div>

            <div class="card_content"> 
                <h2>Compete and Track</h2>
                <p> Challenge others, check your rank on leaderboards, and aim for the top spot.</p>
            </div>
 
        </div>
    </div>

    <div class="grid_item">

        <div class="card">
            <div class="image_container">
            </div>

            <div class="card_content"> 
                <h2>Cross-Platform Accessibility</h2>
                <p> Whether on mobile, tablet, or desktop, our quizzes are designed for a consistent and enjoyable experience.</p>
            </div>

        </div>
    </div>
</section> 
 
  


<section class="work">
    <div class="grid_item">
        <div class="card">
            
            <div class="card_content"> 
           
                <h2>Sign Up/Login</h2>
                <p>Begin by creating a quick account to unlock personalized features.
</p>

            </div>

        </div>
    </div>

    <div class="grid_item">
        <div class="card">
            
            <div class="card_content"> 
            
                <h2>Start Playing</h2>
                <p>With an account, start solving quizzes instantly.</p>
            </div>

            
        </div>
    </div>

    <div class="grid_item">

        <div class="card">
            <div class="image_container">
                
            </div>
            <div class="card_content"> 
            
                <h2>Compete and Track</h2>
                <p> Challenge others, check your rank on leaderboards, and aim for the top spot.</p>
            </div>

            
        </div>
    </div>

    <div class="grid_item">

        <div class="card">
            <div class="image_container">
                
            </div>
            <div class="card_content"> 
              
                <h2>Cross-Platform Accessibility</h2>
                <p> Whether on mobile, tablet, or desktop, our quizzes are designed for a consistent and enjoyable experience.</p>
            </div>

           
        </div>
    </div>
</section>
  {/* features & services end here   */} 
   
   {/* footer section start here */} 
    
    <footer>  

      <div className="section1">  
      <img src={capLogo} alt='Footer-Logo' id='footerlogo'></img>
      <h3>Home|About|Contact|Quizs</h3> 
      <p>Copyright @2023 QuizGrad All right reserved</p>
      </div> 
       
      <div className="section2">   

      <div className="box1">  
      <img src={location} alt='location' id='footer-icon'></img> 
      <p>Bhopal M.P.</p>
      </div>  
     
      <div className="box1">  
      <img src={phone} alt='phone' id='footer-icon'></img> 
      <p>+9198******12</p>
      </div> 
 
      <div className="box1">  
      <img src={email} alt='emailId' id='footer-icon'></img> 
      <p>quizgrad123@gmail.com</p>
      </div>  

      </div> 
       
       <div className="section3">  
       <h2>Abuout the QuizGrad</h2> 
       <p>Quizgrad is a web app which provide  a variety of quizzes! Explore engaging challenges in programming, aptitude, reasoning, and more Elevate your knowledge effortlessly at Quizgrad – where learning meets excitement!"</p> 
       
       <div className="contacts">  
       <img src={fb} alt='facebook' id='footer-icon'></img>  
       <img src={ld} alt='linkedin' id='footer-icon'></img> 
       <img src={insta} alt='Instagram' id='footer-icon'></img>  
       <img src={twitter} alt='twitter' id='footer-icon'></img> 
       </div>
       </div> 

    </footer>

    </>
  );
}

export default Navbar;
 


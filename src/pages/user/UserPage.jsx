import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Quizes from "../../Components/User/quiz/Quizes.jsx";
import "./User_page.css";
import Navbar from "../../Components/homePage/Navbar";
import images from "../../constants/images.js";

const UserPage = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);
  return (
      <div>
          <div className="landinpage" id="start">
        <Navbar />

        {/************** Navbar end here *********************/}
        <div className="line"></div>

        
      </div>
         
        <Quizes />
      </div>


 
    
  );
};

export default UserPage;

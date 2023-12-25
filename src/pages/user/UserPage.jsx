import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Quizes from "../../Components/User/quiz/Quizes.jsx";

const UserPage = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    console.log("User State", userState.userInfo);
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);
  return (
    <div>
      <Quizes />
    </div>
  );
};

export default UserPage;

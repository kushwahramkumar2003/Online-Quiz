import React, { useState } from "react";
import NavLink from "./NavLink";

const Header = ({ userInfo }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleSetActiveTab = (name) => {
    setActiveTab(name);
  };

  return (
    <div>
      <div>
        <h1 className="logo-name-for-admin">QuizGrad</h1>
        <img src={userInfo?.profilePic} alt="profile"></img>
        <p>{userInfo?.name}</p>
      </div>
      <NavLink handleSetActiveTab={handleSetActiveTab} activeTab={activeTab} />
    </div>
  );
};

export default Header;

import React, { useState } from "react";
import NavLink from "./NavLink";

const Header = ({ userInfo, isOpenHeader }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleSetActiveTab = (name) => {
    setActiveTab(name);
  };

  return (
    <div>
      <div className={`${isOpenHeader ? "hidden left-10" : ""}`}>
        <h1 className="logo-name-for-admin">QuizGrad</h1>
        <img src={userInfo?.profilePic} alt="profile"></img>
        <p>{userInfo?.name}</p>
      </div>
      <NavLink
        handleSetActiveTab={handleSetActiveTab}
        activeTab={activeTab}
        isOpenHeader={isOpenHeader}
      />
    </div>
  );
};

export default Header;

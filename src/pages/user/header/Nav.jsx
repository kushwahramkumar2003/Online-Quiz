import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ name, path, icon, isActive, handleSetActiveTab }) => {
  return (
    <Link to={path} onClick={() => handleSetActiveTab(name)}>
      {icon}
      <p>{name}</p>
    </Link>
  );
};

export default Nav;

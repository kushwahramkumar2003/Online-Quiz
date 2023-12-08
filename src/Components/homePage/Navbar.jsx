import React from "react";
import image from "../../constants/images.js";
const menuLinks = [
  { name: "How it works", link: "#works" },
  { name: "Features", link: "#features" },
  { name: "About Us", link: "#about" },
  { name: "Login", link: "#loginpage" },
];
const Navbar = () => {
  return (
    <nav>
      <div className="flex items-center justify-between" id="nav1">
        <div className="mx-7" id="logo1">
          <img src={image.capLogo}></img>
        </div>

        <div className="navbartop">
          <ul className="flex items-center gap-1 py-2 text-base" id="navbar1">
            {menuLinks?.map((menu, i) => (
              <li key={i} className="px-6 hover:text-[#FCC822]" id="links1">
                <a href={menu?.link}>{menu?.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div></div>

        {/* <div>
          </div> */}
      </div>
    </nav>
  );
};

export default Navbar;

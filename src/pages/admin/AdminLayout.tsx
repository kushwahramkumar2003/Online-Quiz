import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./header/Header";
import images from "../../constants/images";
import { IoMdArrowDropdown } from "react-icons/io";
import { RootState } from "../../store/types";

const AdminLayout = () => {
  const navigate = useNavigate();

  const userState = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const role = userState?.userInfo?.role;

    if (!userState.userInfo || !role || !(role === "ADMIN")) {
      navigate("/");
    }
  }, [userState.userInfo, navigate]);

  return (
    <div className="admin-page">
      <Header />
      <div className="admin-right-page">
        <div className="admin-navbar">
          <div className="admin-logo-right">
            <img src={images.MessageIcon} alt="Message" id="message-bell"></img>
            <img src={images.bellIcon} alt="Bell" id="message-bell"></img>

            <img src={images.User} alt="User" id="Admin-logo"></img>
            <IoMdArrowDropdown id="Drop-down-menu-icon" />
          </div>
        </div>
        <div className="shaded-line"></div>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

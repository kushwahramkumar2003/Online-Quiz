import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./header/Header";

const UserLayout = () => {
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const role = userState?.userInfo?.user?.role || userState?.userInfo?.role;

    if (!userState.userInfo || !role || !(role === "USER")) {
      navigate("/");
    }
  }, [userState.userInfo, navigate]);

  return (
    <div className="admin-page">
      <Header userInfo={userState.userInfo} />
      <div className="admin-right-page">
        <main className="bg-[#f9f9f9] flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;

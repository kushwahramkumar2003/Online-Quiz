import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";

import Header from "./header/Header";

const UserLayout = () => {
  const navigate = useNavigate();
  const [isOpenHeader, setIsOpenHeader] = useState(true);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const role = userState?.userInfo?.user?.role || userState?.userInfo?.role;

    if (!userState.userInfo || !role || !(role === "USER")) {
      navigate("/");
    }
  }, [userState.userInfo, navigate]);

  return (
    <div className="flex flex-row admin-page">
      <div className="flex flex-col transition-all scroll-smooth">
        {isOpenHeader ? (
          <IoCloseSharp
            onClick={() => {
              setIsOpenHeader(false);
            }}
          />
        ) : (
          <RxHamburgerMenu
            onClick={() => {
              setIsOpenHeader(true);
            }}
          />
        )}
        <div
          className={`${
            isOpenHeader ? "" : ""
          }  border-x-violet-950 border border-r-rose-600`}
        >
          <Header userInfo={userState.userInfo} isOpenHeader={isOpenHeader} />
        </div>
      </div>

      <div className=" admin-right-page">
        <main className="bg-[#f9f9f9] flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;

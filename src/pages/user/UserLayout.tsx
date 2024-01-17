import  { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";

import Header from "./header/Header";
import { RootState } from "../../store/types";

const UserLayout = () => {
  const navigate = useNavigate();
  const [isOpenHeader, setIsOpenHeader] = useState(false);
  const userState = useSelector((state:RootState) => state.user);

  useEffect(() => {
    const role =  userState?.userInfo?.role;

    if (!userState.userInfo || !role || !(role === "USER")) {
      navigate("/");
    }
  }, [userState.userInfo, navigate]);

  return (
    <div className="flex flex-row w-full max-h-screen overflow-hidden">
      <div className="flex flex-col h-full transition-all scroll-smooth ">
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

      <div className="w-full">
        <main className="bg-[#f9f9f9] flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;

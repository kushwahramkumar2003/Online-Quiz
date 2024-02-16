import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { RootState } from "@/store/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet.tsx"
import NavLink from "@/pages/user/header/NavLink.tsx";
const UserLayout = () => {
  const navigate = useNavigate();
  const userState = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const role = userState?.userInfo?.role;

    if (!userState.userInfo || !role || !(role === "USER")) {
      navigate("/");
    }
  }, [userState.userInfo, navigate]);

  return (
      <>
        <Temp/>
        <div className="w-full">
          <main className="bg-[#f9f9f9] flex-1 p-4 lg:p-6">
            <Outlet/>
          </main>
        </div>
      </>
  );
};
export default UserLayout;
const Temp = () => {
  const userState = useSelector((state: RootState) => state.user);
  const [open,setOpen] = useState(false);
  return (
      <div className="flex justify-between pl-6 pr-6">
        <div className="flex justify-between">
          <div>
            <Sheet onOpenChange={setOpen} open={open}>
              <SheetTrigger> <RxHamburgerMenu
                  size={40}
                  className="p-2 transition-all rounded-lg hover:cursor-pointer hover:bg-slate-300"
              /></SheetTrigger>
              <SheetContent side={"left"}>
                <SheetHeader>
                  <NavLink setOpen={setOpen}/>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

        </div>
        <div className="flex flex-row items-center gap-3 mr-2">
          <div className="w-10 rounded-full">
            <img src={userState.userInfo.avatar} alt="profile-img" />
          </div>
          <div>
            <p>{userState.userInfo.name}</p>
          </div>
        </div>
      </div>
  );
}
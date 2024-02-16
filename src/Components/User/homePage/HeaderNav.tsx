import { RootState } from "@/store/types";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet.tsx"
const HeaderNav = () => {
  const userState = useSelector((state: RootState) => state.user);
  return (
    <div className="flex justify-between pl-6 pr-6">
      <div className="flex justify-between">
          <div>
              <Sheet>
                  <SheetTrigger> <RxHamburgerMenu
                      size={40}
                      className="p-2 transition-all rounded-lg hover:cursor-pointer hover:bg-slate-300"
                  /></SheetTrigger>
                  <SheetContent side={"left"}>
                      <SheetHeader>
                          <SheetTitle>Are you absolutely sure?</SheetTitle>
                          <SheetDescription>
                              This action cannot be undone. This will permanently delete your account
                              and remove your data from our servers.
                          </SheetDescription>
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
};

export default HeaderNav;


import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { MdQuiz } from "react-icons/md";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { SiTestcafe } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { MdNotificationsNone } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { logout as Logout } from "../../../services/user";
import { logout } from "../../../store/actions/userActions";
import Nav from "./Nav";
import {useToast} from "@/components/ui/use-toast.ts";
import { ToastAction } from "@/components/ui/toast"

const NavData = [
  { name: "Dashboard", path: "dashboard", icon: <RxDashboard /> },
  { name: "Profile", path: "profile", icon: <CgProfile /> },
  { name: "Quizzes", path: "quizzes", icon: <MdQuiz /> },
  { name: "Result", path: "result", icon: <BsFileEarmarkSpreadsheetFill /> },
  { name: "Test", path: "test", icon: <SiTestcafe /> },
  { name: "Setting", path: "setting", icon: <IoMdSettings /> },
  {
    name: "Notification",
    path: "notifications",
    icon: <MdNotificationsNone />,
  },
];

const NavLink = ({setOpen}) => {
  const {toast} = useToast();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: () => {
      return Logout();
    },
    onSuccess: async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(logout());

      toast({
        variant: "default",
        description: "Logout Success",
      })
      navigate("/");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with Logout.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })

      console.log(error);
    },
  });

  const logoutHandler = (e) => {
    e.preventDefault();
    mutate();
  };
  return (
    <div>
      <div className="">
        {NavData.map((item, index) => {
          return (
            <Nav
                setOpen={setOpen}
              key={index}
              name={item.name}
              path={item.path}
              icon={item.icon}

            />
          );
        })}
        <button
          onClick={(e) => logoutHandler(e)}
          className="flex flex-row items-center h-10 text-gray-500 hover:text-gray-900"
        >
          {<CiLogout className="" color="red" fontSize={20} fontWeight={5} />}{" "}
          <p >Logout</p>
        </button>
      </div>
    </div>
  );
};

export default NavLink;

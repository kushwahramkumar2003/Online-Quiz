
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
import { toast } from "react-hot-toast";
import { logout } from "../../../store/actions/userActions";
import Nav from "./Nav";

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

const NavLink = ({ handleSetActiveTab, activeTab, isOpenHeader }) => {
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
      toast.success("Logout successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
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
              isOpenHeader={isOpenHeader}
              key={index}
              name={item.name}
              path={item.path}
              icon={item.icon}
              isActive={activeTab === item.name}
              handleSetActiveTab={handleSetActiveTab}
            />
          );
        })}
        <button
          onClick={(e) => logoutHandler(e)}
          className="flex flex-row items-center h-10 text-gray-500 hover:text-gray-900"
        >
          {<CiLogout className="" color="red" fontSize={20} fontWeight={5} />}{" "}
          <p className={`${isOpenHeader ? "hidden" : ""}`}>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default NavLink;

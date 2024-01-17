import images from "../../../constants/images";
import { Link, useNavigate } from "react-router-dom";
import "../Admin.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { logout as Logout } from "../../../services/user";
import { logout } from "../../../store/actions/userActions";
import { RootState } from "../../../store/types";

const NavLink = () => {
  const user = useSelector((state:RootState) => state.user);

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
    <div className="Admin-manu">
      <div className="Grad-logo">
        <h1 className="logo-name-for-admin">QuizGrad</h1>
        <img className="rounded-lg"
          src={user?.userInfo?.avatar ? user?.userInfo?.avatar : images.MyAdmin}
          alt="profile"
        ></img>
        <p>{user?.userInfo?.name}</p>
      </div>

      <Link className="admin-box" to={"dashboard"}>
        <img src={images.Dashboard} alt="MyProfile" id="Admin-icon"></img>
        {/* <RiDashboard3Fill id="Admin-icon"/> */}
        <p>Dashboard</p>
      </Link>

      <Link className="admin-box" to={"profile"}>
        <img src={images.MyProfile} alt="MyProfile" id="Admin-icon"></img>
        <p>My Profile</p>
      </Link>

      <Link className="admin-box" to={"createNewQuiz"}>
        {/* <button
          className="flex flex-row items-center gap-4 text-center"
            onClick={() => setIsOpen(!isOpen)}
        > */}
        <img src={images.CreateQuiz} alt="CreateQuiz" id="Admin-icon" />
        <p>Create Quiz</p>
        {/* </button> */}
      </Link>

      <Link className="admin-box" to={"editQuizs"}>
        <img src={images.Update} alt="updates" id="Admin-icon"></img>
        <p>Edit Quiz</p>
      </Link>

      <Link className="admin-box" to={"setting"}>
        <img src={images.Setting} alt="setting" id="Admin-icon"></img>
        <p>Settings</p>
      </Link>

      <Link className="admin-box" to={"help"}>
        <img src={images.Help} alt="help" id="Admin-icon"></img>
        <p>Help</p>
      </Link>

      <div className="admin-box" onClick={(e) => logoutHandler(e)}>
        <img src={images.Logout} alt="logout" id="Admin-icon"></img>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default NavLink;

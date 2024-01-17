import React from "react";
import image from "../../constants/images.js";
import { Link, useNavigate } from "react-router-dom";
import { Link as Link2 } from "react-scroll";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/userActions.js";
import { useMutation } from "@tanstack/react-query";
import { logout as Logout } from "../../services/user.js";
import { toast } from "react-hot-toast";
import { RootState } from "../../store/types.js";
const menuLinks = [
  { name: "How it works", link: "works" },
  { name: "Features", link: "features" },
  { name: "About Us", link: "about" },
  // { name: "Login", link: "/login" },
];

const NavItem = ({ menu }) => {
  return (
    <>
      <li className="px-6 hover:text-[#FCC822]" id="links1">
        {/* <a href={menu?.link}>{menu?.name}</a> */}
        <Link2
          to={menu?.link}
          spy={true}
          smooth={true}
          // offset={-200}
          activeClass="deactive"
          duration={500}
          className="hover:cursor-pointer"
        >
          {menu?.name}
        </Link2>
      </li>
    </>
  );
};

// const TempNav = () => {
//   return (
//     <>
//       <nav className="">
//         <div className="">
//           <Link to={"/"} className="">
//             <img src={image.capLogo} alt="alt" className="w-[12rem] mx-7"></img>
//           </Link>
//         </div>
//         <section>

//         </section>
//       </nav>
//     </>
//   );
// };

const Navbar = () => {
  // const navigate = useNavigate();
  // const [profileDrowpdown, setProfileDrowpdown] = useState(false);
  const [navIsVisible, setNavIsVisible] = React.useState(false);
  const navVisibilityHandler = () => {
    setNavIsVisible((prev) => !prev);
  };

  const userState = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
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
    <nav>
      <div className="flex items-center justify-between" id="nav1">
        <div className="mx-7" id="logo1">
          <img src={image.capLogo} alt="alt"></img>
        </div>
        <div className="z-50 lg:hidden md:hidden">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
          )}
        </div>
        <div className={`${navIsVisible ? "right-0" : "-right-full"} `}>
          <ul
            className="flex items-center gap-1 py-2 text-base lg:visible md:visible"
            id=""
          >
            {menuLinks?.map((menu, i) => <NavItem key={i} menu={menu} />)}
            <li className="px-6 hover:text-[#FCC822]" id="links1">
              {userState.userInfo ? (
                userState.userInfo.role === "ADMIN" ? (
                  <>
                    <Link to="/Admin">Admin</Link>
                    {/* <button onClick={(e) => logoutHandler(e)}>Logout</button> */}
                  </>
                ) : (
                  <>
                    <Link to="/User">Profile</Link>
                    {/* <button onClick={(e) => logoutHandler(e)}>Logout</button> */}
                  </>
                )
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li className="px-6 hover:text-[#FCC822]" id="links1">
              {userState.userInfo ? (
                userState.userInfo.role === "ADMIN" ? (
                  <>
                    {/* <Link to="/Admin">Admin</Link> */}
                    <button
                      className="disabled:opacity-60 disabled:cursor-not-allowed"
                      onClick={(e) => logoutHandler(e)}
                      disabled={isPending}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    {/* <Link to="/User">Profile</Link> */}
                    <button
                      className="disabled:opacity-60 disabled:cursor-not-allowed"
                      onClick={(e) => logoutHandler(e)}
                      disabled={isPending}
                    >
                      Logout
                    </button>
                  </>
                )
              ) : (
                ""
                // <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* <TempNav /> */}
    </nav>
  );
};

export default Navbar;

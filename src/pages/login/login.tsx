import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";
import images from "../../constants/images.js";
import { login } from "../../services/user.js";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/reducers/userReducers.js";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userState = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const textD = {
    textDecoration: "none",
    color: "black",
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return login({ email, password });
    },
    onSuccess: async (data) => {
      const { user } = data;

      await dispatch(userActions.setUserInfo(user));
      await localStorage.setItem("account", JSON.stringify(user));
      toast.success("Login successfully");

      // console.log("User.role : ", user.role);

      if (user.role === "USER") {
        navigate("/User");
      } else if (user.role === "ADMIN") {
        navigate("/Admin");
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handlePassword = (e) => {
    if (e.target.value === "") {
      setMessage("Please enter your password");
    } else {
      setMessage("");
    }
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate({ email, password });
  };

  return (
    <div className="main">
      <div className="Left-content">
        <nav>
          <img src={images.logo} alt="Logo" id="log1"></img>
        </nav>

        <p id="head">
          <span> Welcome back! </span>
          <br />
          <span> Please login to your account. </span>
        </p>

        <form action="/login" method="post" onSubmit={handleSubmit}>
          <div className="form-details">
            {/* <label> */}
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email Address"
              id="input-same-first"
              className="input-same"
            />
            {/* </label> */}

            {/* <label> */}
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePassword}
                placeholder="Password"
                id="input-same-first"
                className="input-same"
              />
              <span
                className="password-toggle"
                onClick={handlePasswordVisibility}
              >
                {showPassword ? (
                  <i className="far fa-eye-slash"></i>
                ) : (
                  <i className="far fa-eye"></i>
                )}
              </span>
            </div>
            {/* </label> */}

            {message && <p>{message}</p>}
          </div>

          <div className="forget-pass">
            <a
              href="/fogrt"
              target="_blank"
              rel="noopener noreferrer"
              style={textD}
              id="forget"
            >
              Forgot Password?{" "}
            </a>
          </div>

          <div className="btns" style={{}}>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isPending}
              className="login-btn"
            >
              {isPending ? <PulseLoader color="#fff" size={10} /> : "Login"}
            </button>
          </div>

          <div className="changing-status">
            <p>
              {" "}
              Don't have an account?
              <Link className="link" to="/SignUp">
                Signup
              </Link>
            </p>
          </div>

          <div className="another-Login">
            <p> Or Login with </p>
            <p className="same-lo">Google</p>
            <p className="same-lo">Facebook</p>
          </div>
        </form>
      </div>

      <div className="right-img">
        <img src={images.capLogo} alt="Cap"></img>
      </div>
    </div>
  );
}

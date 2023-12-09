import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import images from "../../constants/images";
import { login } from "../../services/user";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers.js";

import "./Login.css";

export default function Login() {
  const naviage = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const textD = {
    textDecoration: "none",
    color: "black",
  };

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: ({ email, password }) => {
      return login({ email, password });
    },
    onSuccess: (data) => {
      const { user } = data;
      toast.success("Login successfully");
      dispatch(userActions.setUserInfo(data.user));
      localStorage.setItem("account", JSON.stringify(data));
      
      // console.log("User.role : ", user.role);

      if (user.role === "USER") {
        naviage("/User");
      } else if (user.role === "ADMIN") {
        naviage("/Admin");
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

        <form action="/login" method="post">
          <div className="form-details">
            <form>
              <label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email Address"
                  className="input-same"
                />
              </label>

              <label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePassword}
                    placeholder="Password"
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
              </label>
            </form>

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
            <button type="submit" onClick={handleSubmit}>
              {" "}
              Login{" "}
            </button>
            {/* <button type='submit'>
              
              
            </button> */}
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

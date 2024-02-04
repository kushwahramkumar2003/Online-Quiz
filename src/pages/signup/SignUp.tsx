import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import "./Signup.css";
import images from "../../constants/images.js";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/reducers/userReducers.js";

import { useMutation } from "@tanstack/react-query";

import { signup } from "../../services/user.js";

export default function Login() {
  // const textD = {
  //   textDecoration: "none",
  //   color: "black",
  // };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const naviage = useNavigate();
  const dispatch = useDispatch();
  // const userState = useSelector((state) => state.user);

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      console.log(data);
      naviage("/User");
      toast.success("Register successfully");
    },
    onError: (error: Error) => {
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    mutate({ name, email, password });
  };

  return (
    <div className="Main">
      <div className="L-content">
        <nav>
          <img src={images.logo} alt="Logo" id="log2" />
        </nav>

        <p id="head-2">
          <span> Welcome to QuizGrad! </span>
          <br />
          <span> Please Signup to your account. </span>
        </p>

        <form>
          <div className="form-details-2">
            {/* <label> */}

            <label>
              <input
                type="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Username"
                className="input-same-2"
              />
            </label>

            <label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                className="input-same-2"
              />
            </label>

            <label>
              <div className="password-input-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePassword}
                  placeholder="Password"
                  className="input-same-2"
                />
                <span
                  className="password-toggle-2"
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

            {message && <p>{message}</p>}
          </div>

          <div className="btn-2">
            <button
              type="submit"
              onClick={submitHandler}
              disabled={isPending}
              className="disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isPending ? <PulseLoader color="#fff" size={10} /> : "SignUp"}
            </button>
          </div>

          <div className="changing-status-2">
            <p>
              {" "}
              Already have an account?
              <Link className="link-2" to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="right-img-2">
        <img src={images.capLogo} alt="Cap" />
      </div>
    </div>
  );
}

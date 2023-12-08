import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import images from "../../constants/images";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers.js";

import { useMutation } from "@tanstack/react-query";

import { signup } from "../../services/user";

export default function Login() {
  const textD = {
    textDecoration: "none",
    color: "black",
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const naviage = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      toast.success("Register successfully");
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      console.log(data);
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Reached Here");
      // Make API call to register the user
      const response = await fetch(
        "http://localhost:3001/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      console.log(response);

      if (response.ok) {
        setMessage("User registered successfully!");
      } else {
        setMessage("Error registering user. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
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
            <button type="submit" onClick={handleSubmit}>
              SignUp
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

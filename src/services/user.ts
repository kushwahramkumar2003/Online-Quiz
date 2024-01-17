// import api from "./baseUrl";

import axios from "axios";
import baseURL from "../constants/baseUrl";

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

const api = axios;

export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await api.post(
      "api/v1/auth/register",
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await api.post(
      "/api/v1/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.msg)
      throw new Error(error.response.data.msg);
    throw new Error(error.msg);
  }
};

export const logout = async () => {
  try {
    const { data } = await api.get("/api/v1/auth/logout", {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.msg)
      throw new Error(error.response.data.msg);
    throw new Error(error.msg);
  }
};

export const getAdminProfile = async () => {
  try {
    const { data } = await api.get("/api/v1/auth/getAdminDetails", {});
    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.msg)
      throw new Error(error.response.data.msg);
    throw new Error(error.msg);
  }
};

export const updateAdminProfile = async ({ userData }) => {
  console.log("userData : ", userData);
  try {
    const { data } = await api.put("/api/v1/auth/updateAdminDetails", {
      ...userData,
    });
    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.msg)
      throw new Error(error.response.data.msg);
    throw new Error(error.msg);
  }
};

import axios from "axios";
import baseURL from "../constants/baseUrl";

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

export const updateProfilePicture = async ({ formData }) => {
  try {
    console.log("formData file : ", formData.get("profilePicture"));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      "/api/v1/profile/updateProfilePicture",
      formData,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getProfile = async () => {
  try {
    const { data } = await axios.get("/api/v1/profile");
    console.log("Profile data : ", data);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateProfile = async ({ formData }) => {
  try {
    console.log("Update Profile called");

    const { data } = await axios.put("/api/v1/profile", formData);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

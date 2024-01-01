import axios from "axios";

export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post("api/v1/auth/register", {
      name,
      email,
      password,
    });
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
    const { data } = await axios.post("/api/v1/auth/login", {
      email,
      password,
    });

 
    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.msg)
      throw new Error(error.response.data.msg);
    throw new Error(error.msg);
  }
};

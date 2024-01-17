// import api from "./baseUrl";
import { toast } from "react-hot-toast";
import axios from "axios";
import baseURL from "../constants/baseUrl";

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

const api = axios;

export const getQuizByIdForUser = async ({ quizId }) => {
  try {
    console.log("Quiz Id", quizId);

    const { data } = await api.get(`/api/v1/userQuiz/${quizId}`, {
      withCredentials: true,
    });

    // let data = undefined;
    // console.log("User Quiz Data : ", data);
    // const { quizData } = data;
    // if (quizData) return quizData;

    return data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
      //   throw new Error(error?.response?.data?.message);
    }
    toast.error(error?.message);
    // throw new Error(error?.message);
  }
};

export const submitOneQuestion = async ({ quizId, questionId, answer }) => {
  try {
    const { data } = await api.post(
      `/api/v1/userQuiz/submitAnswer`,
      {
        quizId,
        questionId,
        answer,
      },
      {
        withCredentials: true,
      }
    );
    // console.log("USer Quiz Data : ", data);
    return data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
      throw new Error(error?.response?.data?.message);
    }
    toast.error(error?.message);
    throw new Error(error?.message);
  }
};

export const submitQuiz = async ({ quizId }) => {
  try {
    const { data } = await api.post(`/api/v1/userQuiz/${quizId}/finishQuiz`, {
      withCredentials: true,
    });
    // console.log("USer Quiz Data : ", data);
    return data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
      throw new Error(error?.response?.data?.message);
    }
    toast.error(error?.message);
    throw new Error(error?.message);
  }
};

export const getResultByIds = async ({ quizId, resultId }) => {
  try {
    const { data } = await api.get(
      `/api/v1/userQuiz/result/${quizId}/${resultId}`,
      {
        withCredentials: true,
      }
    );
    // console.log("USer Quiz Data : ", data);
    return data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
      // throw new Error(error?.response?.data?.message);
    }
    toast.error(error?.message);
    // throw new Error(error?.message);
  }
};

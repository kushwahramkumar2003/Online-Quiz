import axios from "axios";
import { toast } from "react-hot-toast";

export const getQuizByIdForUser = async ({ quizId }) => {
  try {
    console.log("Quiz Id", quizId);

    const { data } = await axios.get(`/api/v1/userQuiz/${quizId}`);

    // let data = undefined;
    const { quizData } = data;
    console.log("USer Quiz Data : ", quizData);
    return quizData;
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
    const { data } = await axios.post(`/api/v1/userQuiz/submitAnswer`, {
      quizId,
      questionId,
      answer,
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

export const submitQuiz = async ({ quizId }) => {
  try {
    const { data } = await axios.post(`/api/v1/userQuiz/${quizId}/finishQuiz`);
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
    const { data } = await axios.get(
      `/api/v1/userQuiz/result/${quizId}/${resultId}`
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

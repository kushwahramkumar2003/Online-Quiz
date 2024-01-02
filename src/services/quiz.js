// import api from "./baseUrl";
import axios from "axios";
import baseURL from "../constants/baseUrl";

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

const api = axios;

export const createNewQuiz = async ({
  title,
  description,
  category,
  duration,
  level,
}) => {
  try {
    const { data } = await api.post(
      "/api/v1/quiz/create",
      {
        title,
        description,
        category,
        duration,
        level,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const addQuestionInQuiz = async ({
  question,
  options,
  correctAnswer,
  quizId,
}) => {
  try {
    console.log("Quiz Id", quizId);
    console.log("Question", question);
    console.log("Options", options);
    console.log("Correct Answer", correctAnswer);
    const { data } = await api.post(
      `/api/v1/quiz//create/addQuestion/${quizId}`,
      {
        question,
        options,
        correctAnswer,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getAllQuizs = async () => {
  try {
    const { data } = await api.get(`/api/v1/quiz`, {
      withCredentials: true,
    });
    console.log("All Quezzes", data);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getQuizById = async ({ quizId }) => {
  try {
    console.log("Quiz Id", quizId);
    const { data } = await api.get(`/api/v1/quiz/${quizId}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updateQuizById = async ({ title, quizId }) => {
  try {
    const { data } = await api.put(
      `/api/v1/quiz/${quizId}/update`,
      {
        title,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updateQuestionByQuizId = async ({
  quizId,
  questionId,
  question,
  options,
  correctAnswer,
}) => {
  try {
    const { data } = await api.put(
      `/api/v1/quiz/${quizId}/question/${questionId}/update`,
      {
        question,
        options,
        correctAnswer,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const deleteQuiz = async ({ quizId }) => {
  try {
    const { data } = await api.delete(`/api/v1/quiz/${quizId}/delete`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const deleteQuestionByQuizId = async ({ quizId, questionId }) => {
  try {
    const { data } = await api.delete(
      `/api/v1/quiz/${quizId}/question/${questionId}/delete`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const publishQuiz = async ({ quizId, publish }) => {
  try {
    const { data } = await api.put(
      `/api/v1/quiz/${quizId}/publish`,
      {
        publish,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

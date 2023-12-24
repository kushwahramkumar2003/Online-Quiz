import axios from "axios";

export const createNewQuiz = async ({ title, description, category }) => {
  try {
    const { data } = await axios.post("/api/v1/quiz/create", {
      title,
      description,
      category,
    });
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
    const { data } = await axios.post(
      `/api/v1/quiz//create/addQuestion/${quizId}`,
      {
        question,
        options,
        correctAnswer,
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
    const { data } = await axios.get(`/api/v1/quiz`);
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
    const { data } = await axios.get(`/api/v1/quiz/${quizId}`);
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
    const { data } = await axios.put(`/api/v1/quiz/${quizId}/update`, {
      title,
    });
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
    const { data } = await axios.put(
      `/api/v1/quiz/${quizId}/question/${questionId}/update`,
      {
        question,
        options,
        correctAnswer,
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
    const { data } = await axios.delete(`/api/v1/quiz/${quizId}/delete`);
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
    const { data } = await axios.delete(
      `/api/v1/quiz/${quizId}/question/${questionId}/delete`
    );
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

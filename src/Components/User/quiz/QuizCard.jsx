import React, { useCallback } from "react";

import { useNavigate } from "react-router-dom";

import FullscreenButton from "../../StartQuiz/FullscreenButton";

const QuizCard = ({ title, desc, category, noQuestions, time, quizId }) => {
  const navigate = useNavigate();

  const onStartQuiz = () => {
    navigate(`/quiz/start/${quizId}`);
  };

  return (
    <div className="p-4 border border-yellow-600 rounded-lg shadow-lg bg-yellow-50">
      <h1 className="text-xl font-bold text-yellow-900">{title}</h1>
      <p className="mt-2 text-yellow-700">{desc}</p>
      <p className="mt-1 text-yellow-600">{category}</p>
      <p className="mt-1 text-yellow-500">{noQuestions}</p>
      <p className="mt-1 text-yellow-400">{time}</p>
      <div className="flex justify-center mt-4">
        <FullscreenButton onStartQuiz={onStartQuiz} quizId={quizId} />
      </div>
    </div>
  );
};

export default QuizCard;

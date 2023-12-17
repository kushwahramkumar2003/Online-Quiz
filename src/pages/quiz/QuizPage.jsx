import React from "react";
import OneQuestionApper from "../../Components/StartQuiz/OneQuestionApper";
import Timer from "../../Components/StartQuiz/Timer";
import QuestionAttempBar from "../../Components/StartQuiz/QuestionAttempBar";

const QuizPage = () => {
  return (
    <div>
      <OneQuestionApper />
      <div>
        <Timer />
        <QuestionAttempBar />
      </div>
    </div>
  );
};

export default QuizPage;

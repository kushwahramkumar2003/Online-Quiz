import React from "react";

const QuestionAttemptChecker = ({
  questionStatus,
  questionNumber,
  setQuestionNumber,
  currentQuestionNumber,
}) => {
  const circleColor = ["bg-white", "bg-yellow-400", "bg-green-500"];

  return (
    <>
      <span
        onClick={() => setQuestionNumber(questionNumber - 1)}
        className={`border border-black  rounded-3xl border-l-gray-950 ${
          circleColor[questionStatus]
        } px-2 w-fit h-fit cursor-pointer ${
          currentQuestionNumber + 1 === questionNumber &&
          "border-2 border-blue-500"
        }}`}
      >
        {questionNumber}
      </span>
    </>
  );
};

export default QuestionAttemptChecker;

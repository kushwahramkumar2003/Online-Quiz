import React from "react";
import "./One_question_apper.css";

const OneQuestionApper = ({
  question,
  questionNumber,
  totalQuestions,
  options,
  selected,
  setSelected,
  correct,
  setCorrect,
  setQuestionNumber,
  setQuestions,
  setStart,
  setOptionSelected,
}) => {
  const handleOptionChange = (e) => {
    setOptionSelected(e.target.value);
  };

  return (
    <div>
      <p className="quiz-questn">Question {questionNumber}</p>
      <p className="question-show">{question}</p>
      <ul>
        {options?.map((option, index) => (
          <li
            key={option}
            className="ml-4 font-semibold text-green-500 Quiz-options"
          >
            <input
              id={`question_${option}`}
              type="radio"
              name={`question_${option}`}
              value={option}
              checked={option === selected}
              onChange={handleOptionChange}
            />
            <label htmlFor={`question_${option}`}>{option}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OneQuestionApper;

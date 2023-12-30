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
  const handleOptionClick = (option) => {
    setOptionSelected(option);
    
    if (option === correct) {
      setOptionSelected((prevCorrect) => prevCorrect + 1);
    }
  };

  return (
    <div>
      <p className="quiz-questn"> Question {questionNumber}</p>
      <p className="question-show">{question}</p>
      
      <ul className="quiz-optn">
        {options?.map((option, index) => (
          <li key={index} onClick={() => handleOptionClick(option)} className="Quiz-options text-green-500 font-semibold ml-4">
            {/* {option} */}
            <input
              className="quiz-radio-btn"
              type="radio"
              name="quizOption"
              value={option}
              onChange={() => handleOptionClick(option)}
            />
            <label onClick={() => handleOptionClick(option)}>{option}</label>
          </li>
        ))} 
      </ul>
    </div>
  );
};

export default OneQuestionApper;

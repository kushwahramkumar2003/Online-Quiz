import React from "react";

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
      <h2>Question {questionNumber}</h2>
      <p>{question}</p>
      <ul>
        {options?.map((option, index) => (
          <li key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OneQuestionApper;

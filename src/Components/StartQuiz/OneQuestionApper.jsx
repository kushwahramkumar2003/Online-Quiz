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
}) => {
  const handleOptionClick = (option) => {
    setSelected(option);
    if (option === correct) {
      setCorrect((prevCorrect) => prevCorrect + 1);
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

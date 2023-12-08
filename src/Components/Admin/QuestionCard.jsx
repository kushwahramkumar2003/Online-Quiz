import React from "react";

const QuestionCard = ({ question, options, questionId, answer }) => {
  return (
    <div>
      <div>
        <h3>{question}</h3>
        <ul>
          {options.map((option, index) => {
            return <li key={questionId + index}>{option}</li>;
          })}
        </ul>
        <p>Answer: {answer}</p>
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default QuestionCard;

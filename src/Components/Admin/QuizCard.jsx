import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({
  title,
  category,
  description,
  times_taken,
  quiz_id,
  questions,
}) => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="mb-2 card-subtitle text-muted">{category}</h6>
          <p className="card-text">{description}</p>
          <p className="card-text">Times taken: {times_taken}</p>
          <p className="card-text">Questions: {questions}</p>

          <Link to={`/quiz/${quiz_id}`} className="card-link">
            <button>View Quiz</button>
          </Link>
          <Link to={`/quiz/edit/${quiz_id}`}>
            <button>Edit Quiz</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default QuizCard;

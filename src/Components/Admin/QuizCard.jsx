import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteQuiz } from "../../services/quiz";
import toast from "react-hot-toast";

const QuizCard = ({
  title,
  category,
  description,
  duration,
  quiz_id,
  questions,
  setRefresh,
  level = null,
  published = null,
  numberOfQuestions,
}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ quiz_id }) => {
      return deleteQuiz({ quizId: quiz_id });
    },
    onSuccess: (data) => {
      toast.success("Quiz deleted successfully");
      setRefresh((prev) => !prev);
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const { mutate: publishQuiz, isLoading: publishQuizIsLoading } = useMutation({
    mutationFn: ({ quizId }) => {
      return publishQuiz({ quizId });
    },
    onSuccess: (data) => {
      toast.success("Quiz Published successfully");
      setRefresh((prev) => !prev);
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const deleteHandler = (data, error) => {
    mutate({ quiz_id });
  };

  const handlePublish = () => {
    publishQuiz({ quizId: quiz_id });
  };
  return (
    <>
      {/* <div className="card"> */}
      <div className="card-body">
        <h5 className="card-title">Tittle : {title}</h5>
        <h6 className="mb-2 card-subtitle text-muted">Category : {category}</h6>
        <p className="card-text">Description : {description}</p>
        <p className="card-text">Time taken: {duration} min</p>
        <p className="card-text">Questions: {questions}</p>

        <Link to={`/quiz/edit/${quiz_id}`}>
          <button>Edit Quiz</button>
        </Link>
        <button onClick={deleteHandler}>Delete</button>

        <button
          disabled={published || !questions.length !== numberOfQuestions}
          onClick={() => handlePublish()}
        >
          {published === true ? "Published" : "Publish"}
        </button>
      </div>
      {/* </div> */}
    </>
  );
};

export default QuizCard;

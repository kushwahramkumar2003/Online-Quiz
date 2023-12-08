import React from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteQuestionByQuizId } from "../../services/quiz";

const QuestionCard = ({
  question,
  options,
  questionId,
  answer,
  quizId,
  setRefresh,
}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ questionId, quizId }) => {
      return deleteQuestionByQuizId({
        questionId,
        quizId,
      });
    },
    onSuccess: (data) => {
      toast.success("Question deleted successfully");
      setRefresh((prev) => !prev);
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const deleteHandler = () => {
    mutate({ questionId, quizId });
  };
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
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};

export default QuestionCard;

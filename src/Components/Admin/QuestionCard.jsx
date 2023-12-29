import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteQuestionByQuizId } from "../../services/quiz";
import Modal from "../modal/Modal";
import UpdateQuestion from "./UpdateQuestion";

const QuestionCard = ({
  question,
  options,
  questionId,
  answer,
  quizId,
  setRefresh,
}) => {
  const [isEdit, setIsEdit] = useState(false);


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
      {isEdit && (
        <Modal setIsOpen={setIsEdit}>
          <UpdateQuestion
            quizId={quizId}
            question={question}
            options={options}
            questionId={questionId}
            answer={answer}
            setRefresh={setRefresh}
            setIsEdit={setIsEdit}
          />
        </Modal>
      )}
      <div>
        <div>
          <h3>{question}</h3>
          <ul className="text-green-800 font-semibold ml-5">
            {options.map((option, index) => {
              return <li key={questionId + index} className="text-green-800 font-semibold ml-5">{option}</li>;
            })}
          </ul>
          <p>Answer: {answer}</p>
        </div>
        <div>
          <button onClick={() => setIsEdit(true)}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteQuestionByQuizId } from "../../services/quiz";
import Modal from "../modal/Modal";
import UpdateQuestion from "./UpdateQuestion";
import "./QuestionCard.css";

type deleteQuestionByQuizIdArgument = {
  questionId: string;
  quizId: string;
};

const QuestionCard = ({
  question,
  options,
  questionId,
  answer,
  quizId,
  setRefresh,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const { mutate } = useMutation({
    mutationFn: ({ questionId, quizId }: deleteQuestionByQuizIdArgument) => {
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
      <div className="Edit-section">
        <div className="Ques-container">
          <div className="Ques-boxs">
            <h3>Question: {question}</h3>
            <ul className="ml-5 font-semibold text-green-800">
              {options.map((option, index) => {
                return (
                  <li
                    key={questionId + index}
                    className="ml-5 font-semibold text-green-800"
                  >
                    {option}
                  </li>
                );
              })}
            </ul>
            <p>Answer: {answer}</p>
          </div>

          <div className="E-D-btn">
            <button className="bg-[#34A853]" onClick={() => setIsEdit(true)}>
              EditQuiz
            </button>
            <button className="bg-[#EA4335]" onClick={deleteHandler}>
              DeleteQuiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

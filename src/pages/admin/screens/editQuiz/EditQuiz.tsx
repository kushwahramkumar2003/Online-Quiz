import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { getQuizById } from "../../../../services/quiz";
import QuestionCard from "../../../../Components/Admin/QuestionCard";
import AddNewQuestion from "../../../../Components/Admin/AddNewQuestion";
import Modal from "../../../../Components/modal/Modal";
import { RootState } from "../../../../store/types";

const EditQuiz = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const userState = useSelector((state: RootState) => state.user);

  const { quiz_id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    const role = userState?.userInfo?.role;

    if (!role) {
      navigate("/");
    }

    console.log("Role", role);

    if (!userState.userInfo || !role || !(role === "ADMIN")) {
      navigate("/");
    }
  }, [userState.userInfo, navigate]);

  useEffect(() => {
    async function fetchData() {
      const quiz = await getQuizById({ quizId: quiz_id });
      //   console.log("Quiz ", quiz.questions);
      setQuestions(quiz.questions);
    }
    fetchData();
  }, [isOpen, quiz_id, refresh]);
  return (
    <div className="edit-quiz-contaner">
      <div className="Edit-quiz-page">
        <h1>Edit Quiz</h1>
        <div>
          {questions.map((q) => {
            return (
              <QuestionCard
                question={q.text}
                options={q.options}
                questionId={q._id}
                answer={q.answer}
                key={q._id}
                quizId={quiz_id}
                setRefresh={setRefresh}
              />
            );
          })}
        </div>
        {isOpen && (
          <Modal setIsOpen={setIsOpen}>
            <AddNewQuestion setIsOpen={setIsOpen} quizId={quiz_id} />
          </Modal>
        )}
        <button
          className="bg-red-500 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoMdAdd className="w-auto h-10 text-white" />
        </button>
      </div>
    </div>
  );
};

export default EditQuiz;

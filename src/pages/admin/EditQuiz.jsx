import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQuizById } from "../../services/quiz";
import QuestionCard from "../../Components/Admin/QuestionCard";

const EditQuiz = () => {
  const userState = useSelector((state) => state.user);
  const { quiz_id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = React.useState([]);

  useEffect(() => {
    const role = userState.userInfo.user.role || userState.userInfo.data.role;

    if (!userState.userInfo || !(role === "ADMIN")) {
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
  }, []);
  return (
    <div>
      <h1>Edit Quiz</h1>

      {questions.map((q) => {
        
        return (
          <QuestionCard
            question={q.text}
            options={q.options}
            questionId={q._id}
            answer={q.answer}
            key={q._id}
          />
        );
      })}
    </div>
  );
};

export default EditQuiz;
